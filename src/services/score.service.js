import { supabase } from '@/services/supabase/supabase.js';

export class ScoreService {
    static async checkTodayScoreExists(userId) {
        const { data, error } = await supabase
            .from('daily_scores')
            .select('*')
            .eq('user_id', userId)
            .eq('date', new Date().setHours(0, 0, 0, 0))
            .single();
        return { data, error };
    }

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