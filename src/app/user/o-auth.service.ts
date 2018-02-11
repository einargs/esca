export abstract class OAuthService {
  abstract signInWithGoogle(): Promise<void>;
}
