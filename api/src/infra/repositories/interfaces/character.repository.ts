import { Character } from "../../../domain";

export interface ICharacterRepository {
    save(character: Character): Promise<Character>;
    findAll(): Promise<Character[]>;
    delete(id: number): Promise<void>;

}