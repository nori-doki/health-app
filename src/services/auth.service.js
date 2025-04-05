import { supabase } from '@/services/supabase.js';

export class AuthService {
    static async signUp(payload) {
        console.log('payload:', payload)
        //#TODO Implement error handling in signup
        // const { data, error } = await supabase.auth.signUp(payload);
        // data.user.id
        // data.user.user_metadata.nickname
        // data.user.user_metadata.step_goal
        // return { data, error };
        const data = null;
        const error = 'failed to sign up';
        return {data, error};

    }
};