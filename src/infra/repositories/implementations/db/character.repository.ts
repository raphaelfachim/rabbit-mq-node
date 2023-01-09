import { injectable } from "inversify";
import { Character } from "../../../../domain/character.entity";
import { ICharacterRepository } from "../../interfaces";
import { AppDataSource } from "./typeorm";

@injectable()
export class CharacterRepository implements ICharacterRepository {
    
    private _datasource = AppDataSource;
    
    save(character: Character): Promise<Character> {
        return this._datasource.getRepository(Character).save(character);
    }
    
    findAll(): Promise<Character[]> {
        return this._datasource.getRepository(Character).find({
            relations: {
                user: true
            }
        });
    }

    async delete(id: number): Promise<void> {
        this._datasource.getRepository(Character).delete(id);
    }
}