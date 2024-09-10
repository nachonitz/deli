import { Request, Response } from "express";
import { CreateUserDto } from "../dtos/createUserDto";
import { validate } from "class-validator";
import { AccountService } from "../../business/services/accountService";
import { User } from "../../business/user";

export class AccountController {
  private accountService: AccountService;

  constructor(userService: AccountService) {
    this.accountService = userService;
  }

  createUser = async (req: Request, res: Response) => {
    try {
      const createUserDto = new CreateUserDto(
        req.body.email,
        req.body.fullname,
        req.body.age,
        req.body.username,
        req.body.country,
        req.body.password
      );

      const errors = await validate(createUserDto);
      if (errors.length > 0) {
        return res.status(400).send(errors);
      }

      const newUser = new User(
        createUserDto.email,
        createUserDto.fullname,
        createUserDto.age,
        createUserDto.username,
        createUserDto.country,
        createUserDto.password
      );

      const token = await this.accountService.createUser(newUser);

      if (!token) {
        return res.status(400).json({ message: "El email ya está en uso" });
      }

      return res.status(201).json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error al crear usuario" });
    }
  };
}
