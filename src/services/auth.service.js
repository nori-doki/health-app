import { supabase } from '@/services/supabase/supabase.js';
import { useCookies } from "vue3-cookies";

export class AuthService {

    static async signUp(payload) {
        //#TODO Implement error handling in signup
        const { data, error } = await supabase.auth.signUp(payload);
        return { data, error };
    }

    static async logIn(payload) {
        const { cookies } = useCookies();
        const { data : { user, session } = {}, error } = await supabase.auth.signInWithPassword(payload);
        cookies.set("user_id", user.id);
        return { user, session, error };
    }   

    static async logOut() {
        const { error } = await supabase.auth.signOut();
        return { error };
    }

    static async sendPasswordResetEmail(email) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http://localhost:5173/reset-password',
        });
        return { error };
    }

    static async updatePassword(newPassword) {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        return { error };
    }
};