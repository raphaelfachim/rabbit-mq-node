import { Character } from "../../character.entity";
import { CharacterHttpInputTO } from "../../to/character";
import { User } from "../../user.entity";

export const parse = (characterHttpInput: CharacterHttpInputTO): Character => {
    let char = new Character();
    char.name = characterHttpInput.nome;
    char.user = new User();
    char.user.id = characterHttpInput.id_usuario;
    return char;
}