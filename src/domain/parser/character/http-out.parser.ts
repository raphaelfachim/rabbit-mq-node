import { Character } from "../../character.entity";
import { CharacterHttpOutputTO } from "../../to/character";

export const parse = (character: Character): CharacterHttpOutputTO => {
    return {
        id: character.id,
        id_usuario: character.user.id,
        nome: character.name
    }
}