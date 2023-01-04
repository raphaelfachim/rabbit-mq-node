import { injectable } from "inversify";
import { User } from "../../../../domain";
import { IUserRepository } from "../../interfaces";

@injectable()
export class UserRepositoryMemory implements IUserRepository {

    private users: User[] = [];

    constructor() {
        this.users.push(new User("João da Silva", 20, "184.152.562-56"));
    }

    findAll(): Promise<User[]> {
        return new Promise<User[]>((resolve) => {
            resolve(this.users);
        })
    }
    findById(id: number): Promise<User> {
        throw new Error("Method not implemented.");
    }
    create(user: User): Promise<User> {
        this.users.push(user);
        return new Promise<User>((resolve) => {
            resolve(user);
        });
    }

}