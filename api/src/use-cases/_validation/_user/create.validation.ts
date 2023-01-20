import { UserHttpInputTO } from "../../../domain/to/user";

export const validate = (dto: UserHttpInputTO) => {
    if(!dto.nome) throw Error("O nome do usuário é obrigatório");
    if(!dto.email) throw Error("O email é obrigatório");
    if(!dto.senha) throw Error("A senha é obrigatória");
    if(!dto.data_nascimento) throw Error("A data de nascimento é obrigatória");
}