import { UserHttpInputTO } from "../../to/user";
import { User } from "../../user.entity";

export const parse = (userHttpInput: UserHttpInputTO): User => {
    return new User(
        userHttpInput.nome,
        userHttpInput.senha,
        userHttpInput.email,
        new Date(userHttpInput.data_nascimento),
    );
}