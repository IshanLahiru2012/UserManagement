export interface AuthUser {
    username: string;
    email : string;
    roles: string[];
    accessToken: string;
}

export interface LoginResponse {
    accessToken: string;
    roles: string[];
    email: string;

}
