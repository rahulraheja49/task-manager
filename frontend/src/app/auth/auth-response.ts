export interface AuthResponse {
  user: {
    id: number;
    fullName: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
  };
  token: string;
  jwtLifetime: number;
}
