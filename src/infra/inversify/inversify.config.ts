import "reflect-metadata"
import { Container } from "inversify";
import { UserRepositoryMemory } from "../repositories/implementations/mem/user.respository";
import { TYPES } from "./types";
import { IUserRepository } from "../repositories/interfaces";

export const inversifyContainer = new Container();

// repositórios
inversifyContainer.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepositoryMemory);