import { supabase } from '@/services/supabase.js';

export class AuthService {
    static async signUp(payload) {
        //#TODO Implement error handling in signup
        const { data, error } = await supabase.auth.signUp(payload);
        return { data, error };
    }

    static async logIn(payload) {
        const { user, session, error } = await supabase.auth.signInWithPassword(payload);
        return { user, session, error };
    }   

    static async logOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    }
};