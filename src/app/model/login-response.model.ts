export class LoginResponse{

  constructor(
    public authenticated: boolean,
    public user: string
  ) {
  }
}
