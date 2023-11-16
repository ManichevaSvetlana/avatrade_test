export interface UserState {
  isLoggedIn: boolean;
  user: {
    name: string | null;
    email: string | null;
    token: string | null;
  };
  error: string | null;
}
