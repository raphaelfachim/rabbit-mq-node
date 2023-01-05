import { Character } from "../../character.entity";
import { CharacterHttpOutputTO } from "../../to/character";

export const parse = (character: Character): CharacterHttpOutputTO => {
    return {
        id: character.id,
        nome: character.name
    }
}