import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with default values that are valid URLs
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBsYWNlaG9sZGVyLXByb2plY3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTYwMDAwMDAwMCwiZXhwIjoxNjAwMDAwMDAwfQ.placeholder_signature';

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase; 