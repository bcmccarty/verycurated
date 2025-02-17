
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ymuiubulmrdgoptyxiki.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltdWl1YnVsbXJkZ29wdHl4aWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA3OTU2ODIsImV4cCI6MjAyNjM3MTY4Mn0.HmN4fQBcwTB5ulfvklOQM4LXTg28nj7qgCJxQLTyQoU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
