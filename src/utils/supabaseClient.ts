import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Please provide a VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variable"
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
