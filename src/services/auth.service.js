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
};