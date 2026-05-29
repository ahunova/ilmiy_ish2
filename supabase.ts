import { createClient } from "@supabase/supabase-js";

// Environment variables are injected via vite.config.ts
const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_ANON_KEY || '';

/**
 * Supabase client initialization.
 * 
 * We use placeholders if variables are missing. This prevents the app from 
 * crashing on startup, allowing the user to still use the local features 
 * (IndexedDB). Cloud sync functionality will only work once the real 
 * environment variables are provided in the .env file.
 */
export const supabase = createClient(
  supabaseUrl || 'https://placeholder-project.supabase.co', 
  supabaseKey || 'placeholder-key'
);
