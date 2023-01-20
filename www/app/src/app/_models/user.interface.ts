export interface User {
    nome: string;
    email: string;
    senha: string;
    data_nascimento: string;
    idade?: number;
    data_criacao?: Date;
}