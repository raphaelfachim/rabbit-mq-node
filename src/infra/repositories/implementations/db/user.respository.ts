import { injectable } from "inversify";
import { Character, User } from "../../../../domain";
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
    
    async deleteUsersCharacter(user: User): Promise<User> {
        const charId = user.character?.id;
        
        var sqlUser = `
            UPDATE users 
            SET characters_id = null
            WHERE id = ${user.id};
        `;

        if (charId) {
            var sqlChar = `
                UPDATE characters
                SET users_id = null
                WHERE id = ${charId};
            `;

            await this._datasource
                .getRepository(Character)
                .manager
                .query(sqlChar);
        }


        return this._datasource
            .getRepository(User)
            .manager
            .query(sqlUser);
    }
}