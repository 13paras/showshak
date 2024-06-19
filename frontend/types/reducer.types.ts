import { User } from "./types";

interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export { UserReducerInitialState };
