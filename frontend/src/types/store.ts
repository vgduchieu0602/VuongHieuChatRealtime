import type { User } from "./user";

export interface AuthState {
    accessToken: string | null;
    user: User | null;
    loading: boolean;

    //Hàm không nhận vào tham số
    clearState: () => void;

    signUp: (userName: string, password: string, email: string, firstName:string, lastName: string) => Promise<void>;
    signIn: (userName: string, password: string) => Promise<void>;
    signOut: () => Promise<void>;
}