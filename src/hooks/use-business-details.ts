"use client";

import { useState, useEffect, useCallback } from "react";

export interface BusinessDetails {
  companyName: string;
  phone: string;
  website: string;
  instagram: string;
  facebook: string;
  twitter: string;
  logoUrl: string;
}

const STORAGE_KEY = "cricpro_business_details";

const defaultDetails: BusinessDetails = {
  companyName: "",
  phone: "",
  website: "",
  instagram: "",
  facebook: "",
  twitter: "",
  logoUrl: "",
};

export function useBusinessDetails() {
  const [details, setDetails] = useState<BusinessDetails>(defaultDetails);
  const [loaded, setLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<BusinessDetails>;
        setDetails((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // ignore parse errors
    }
    setLoaded(true);
  }, []);

  // Save to localStorage on change (skip initial load)
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
