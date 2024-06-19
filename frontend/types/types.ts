import { JwtPayload } from "jwt-decode";

interface User {
  message: string;
  id: string;
  token: string;
  email?: string;
}

interface CustomPayload extends JwtPayload {
  userId: string;
}

export { User, CustomPayload };
