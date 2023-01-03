import { User } from "../../../../domain";
import { IUserRepository } from "../../interfaces";

export class UserRepositoryMemory implements IUserRepository {

    private users: User[] = [];

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