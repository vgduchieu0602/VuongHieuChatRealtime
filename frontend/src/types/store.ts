import type { User } from "./user";

export interface AuthState {
    accessToken: string | null;
    user: User | null;
    loading: boolean;

    setAccessToken: (accessToken:string) => void;

    //Hàm không nhận vào tham số
    clearState: () => void;

    signUp: (userName: string, password: string, email: string, firstName:string, lastName: string) => Promise<void>;
    signIn: (userName: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
    fetchMe: () => Promise<void>;
    refresh: () => Promise<void>;
}