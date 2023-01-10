import "reflect-metadata"
import { Container } from "inversify";
import { TYPES } from "./types";
import { ICharacterRepository, IUserRepository } from "../repositories/interfaces";
import { CharacterRepository, UserRepository } from "../repositories/implementations/db";

export const inversifyContainer = new Container();

// repositórios
inversifyContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);
inversifyContainer.bind<ICharacterRepository>(TYPES.ICharacterRepository).to(CharacterRepository);