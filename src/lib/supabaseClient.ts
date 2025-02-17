
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gzganvncavbtsjpecpjy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6Z2Fudm5jYXZidHNqcGVjcGp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NjQzNDgsImV4cCI6MjA1NTM0MDM0OH0.-dFH_u7EhiVefJlWuPFBNOjoYJnvP6xvxPUjrlIdaOs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
