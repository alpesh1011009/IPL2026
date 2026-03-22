import { createClient } from "./client";
import type { BusinessDetails } from "@/hooks/use-business-details";

export async function fetchProfile(userId: string): Promise<BusinessDetails | null> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("business_details")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return data.business_details as BusinessDetails;
}

export async function upsertProfile(userId: string, details: Omit<BusinessDetails, "logoUrl">): Promise<void> {
  const supabase = createClient();
  await supabase.from("profiles").upsert({
    id: userId,
    business_details: details,
    updated_at: new Date().toISOString(),
  });
}
