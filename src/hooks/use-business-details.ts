"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from "@/context/auth-context";
import { fetchProfile, upsertProfile } from "@/lib/supabase/profile";

export interface BusinessDetails {
  companyName: string;
  phone: string;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  logoUrl: string;
}

const STORAGE_KEY = "cricpost_business_details";

const defaultDetails: BusinessDetails = {
  companyName: "",
  phone: "",
  website: "",
  instagram: "",
  facebook: "",
  twitter: "",
  logoUrl: "",
};

function loadFromStorage(): Partial<BusinessDetails> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as Partial<BusinessDetails>;
  } catch {
    // ignore parse errors
  }
  return {};
}

export function useBusinessDetails() {
  const [details, setDetails] = useState<BusinessDetails>(defaultDetails);
  const [loaded, setLoaded] = useState(false);
  const { user, authLoading } = useAuth();
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Track when details were fetched from Supabase to skip one save cycle
  const justFetchedRef = useRef(false);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = loadFromStorage();
    setDetails((prev) => ({ ...prev, ...saved }));
    setLoaded(true);
  }, []);

  // Sync from Supabase when user logs in
  useEffect(() => {
    if (authLoading || !user) return;
    fetchProfile(user.id).then((remoteDetails) => {
      if (remoteDetails) {
        justFetchedRef.current = true;
        setDetails((prev) => ({ ...prev, ...remoteDetails, logoUrl: prev.logoUrl }));
      }
    });
  }, [user, authLoading]);

  // Reset to localStorage when user logs out
  useEffect(() => {
    if (authLoading || user) return;
    const saved = loadFromStorage();
    setDetails({ ...defaultDetails, ...saved });
  }, [user, authLoading]);

  // Save to localStorage whenever details change (skip initial load)
  useEffect(() => {
    if (!loaded) return;
    try {
      // Don't persist logoUrl (it's a data URI, too large)
      const toSave = { ...details, logoUrl: "" };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
    } catch {
      // storage full or unavailable
    }
  }, [details, loaded]);

  // Debounced save to Supabase when logged in
  useEffect(() => {
    if (!loaded || !user) return;

    // Skip the first save cycle right after fetching from Supabase
    if (justFetchedRef.current) {
      justFetchedRef.current = false;
      return;
    }

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      upsertProfile(user.id, { ...details, logoUrl: "" });
    }, 1500);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [details, loaded, user]);

  const updateField = useCallback(
    (field: keyof BusinessDetails, value: string) => {
      setDetails((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const clearAll = useCallback(() => {
    setDetails(defaultDetails);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  return { details, setDetails, updateField, clearAll, loaded };
}
