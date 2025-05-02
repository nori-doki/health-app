import { supabase } from '@/services/supabase/supabase.js';

export class ScoreService {
    static async getDailyScores() {
        const { data, error } = await supabase
            .from('daily_scores')
            .select('*')
            .order('created_at', { ascending: false });
        return { data, error };
    }

    static async addDailyScores(payload) {
        const { data, error, status } = await supabase
            .from('daily_scores')
            .insert(payload);
        return { data, error, status };
    }
}