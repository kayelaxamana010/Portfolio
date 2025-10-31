import { createClient } from '@supabase/supabase-js';

// Access environment variables using import.meta.env for Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Make Supabase optional - only create client if credentials are provided
let supabase = null;

if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn("Supabase credentials not found. Supabase features will be disabled.");
}

export { supabase };