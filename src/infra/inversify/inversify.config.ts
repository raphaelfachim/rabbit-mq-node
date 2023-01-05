import "reflect-metadata"
import { Container } from "inversify";
import { UserRepositoryMemory } from "../repositories/implementations/mem/user.respository";
import { TYPES } from "./types";
import { ICharacterRepository, IUserRepository } from "../repositories/interfaces";
import { CharacterRepository } from "../repositories/implementations/db/character.repository";

export const inversifyContainer = new Container();

// repositórios
inversifyContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepositoryMemory);
inversifyContainer.bind<ICharacterRepository>(TYPES.ICharacterRepository).to(CharacterRepository);