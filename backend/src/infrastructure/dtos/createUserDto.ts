import { IsEmail, IsInt, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  fullname: string;

  @IsInt()
  age: number;

  @IsString()
  username: string;

  @IsString()
  country: string;

  @IsString()
  @Length(8)
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
