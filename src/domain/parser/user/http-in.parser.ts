import { UserHttpInputTO } from "../../to/user";
import { User } from "../../user";

export const parse = (userHttpInput: UserHttpInputTO): User => {
    return new User(
        userHttpInput.nome,
        Number(userHttpInput.idade),
        userHttpInput.documento
    );
}