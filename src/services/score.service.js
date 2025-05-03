import { supabase } from '@/services/supabase/supabase.js';

export class ScoreService {
    static async checkScoreExists(userId, date) {
        const { data, error } = await supabase
            .from('daily_scores')
            .select('*')
            .eq('user_id', userId)
            .eq('date', date || new Date().setHours(0, 0, 0, 0))
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

    static async updateDailyScores(payload) {
        const { data, error, status } = await supabase
            .from('daily_scores')
            .update(payload)
            .eq('user_id', payload.user_id)
            .eq('date', payload.date);
        return { data, error, status };
    }
}