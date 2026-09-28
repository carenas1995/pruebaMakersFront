export interface LoginRequestDTO {
 email: string;
 password: string;
}

export interface LoginResponseDTO {
 token: string;
 tipoToken: string;
 email: string;
 rol?: 'ADMIN' | 'USER';
 role?: 'ADMIN' | 'USER';
}

export interface UsuarioSesion {
 email: string;
 rol: 'ADMIN' | 'USER';
 token: string;
}