import { createClient } from '@supabase/supabase-js'

const URL = 'https://izzuwyridimbnerditli.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6enV3eXJpZGltYm5lcmRpdGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQxNTQ0NzQsImV4cCI6MjAyOTczMDQ3NH0.quwICBY52I3CJcHpKz6cCI0QQ9FHWCIs78qZ8oLIKv8';

export const supabase = createClient(URL, API_KEY);