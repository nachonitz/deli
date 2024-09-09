export class User {
  email: string;
  fullname: string;
  age: number;
  username: string;
  country: string;
  password: string;

  constructor(
    email: string,
    fullname: string,
    age: number,
    username: string,
    country: string,
    password: string
  ) {
    this.email = email;
    this.fullname = fullname;
    this.age = age;
    this.username = username;
    this.country = country;
    this.password = password;
  }
}
