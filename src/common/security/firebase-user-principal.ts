export class FirebaseUserPrincipal {
  constructor(
    public readonly uid: string,
    public readonly email: string,
    public readonly emailVerified: boolean,
  ) {}
}
