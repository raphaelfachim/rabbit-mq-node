import { Character } from "../../character.entity";
import { CharacterHttpInputTO } from "../../to/character";

export const parse = (characterHttpInput: CharacterHttpInputTO): Character => {
    let char = new Character();
    char.name = characterHttpInput.nome;
    return char;
}