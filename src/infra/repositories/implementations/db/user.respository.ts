import { injectable } from "inversify";
import { User } from "../../../../domain";
import { IUserRepository } from "../../interfaces";
import { AppDataSource } from "./typeorm";

@injectable()
export class UserRepository implements IUserRepository {
    
    private _datasource = AppDataSource;
    
    findAll(): Promise<User[]> {
        return this._datasource.getRepository(User).find();
    }
    
    findById(id: number): Promise<User> {
        return this._datasource.getRepository(User).findOne({
            where: {
                id: id
            },
            relations: {
                character: true
            }
        });
    }

    create(user: User): Promise<User> {
        return this._datasource.getRepository(User).save(user);
    }

    save(user: User): Promise<User> {
        return this._datasource.getRepository(User).save(user, {
            reload: true
        });
    }

}