export class User {
  username: string = "";
  email: string = "";
  createdAt: string = "";
  updateAt: string = "";
  token: string = "";

  constructor(initializer?: any) {
    if (!initializer) return;
    if (initializer.username) this.username = initializer.username;
    if (initializer.email) this.email = initializer.email;
    if (initializer.createdAt) this.createdAt = initializer.createdAt;
    if (initializer.updateAt) this.updateAt = initializer.updateAt;
    if (initializer.token) this.token = initializer.token;
  }
}
