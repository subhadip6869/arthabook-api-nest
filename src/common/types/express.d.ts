import { FirebaseUserPrincipal } from './firebase-user-principal';

declare global {
  namespace Express {
    interface Request {
      user: FirebaseUserPrincipal;
    }
  }
}
