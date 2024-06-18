import { User } from "./types";

interface UserReducerInitialState {
  user: User | null;
  loading: boolean;
}

export { UserReducerInitialState}