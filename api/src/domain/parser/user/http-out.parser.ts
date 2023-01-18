import { UserHttpOutputTO } from "../../to/user"
import { User } from "../../user.entity"

export const parse = (user: User): UserHttpOutputTO => {
    return {
        name : user.name,
        age : getAgeFromBirthDate(user.birthDate),
        created : user.createdAt.toISOString(),
    }
}

const getAgeFromBirthDate = (birthDate: Date): number => {
    const diffMs: number = new Date().getTime() - birthDate.getTime();
    const ageDate: Date = new Date(diffMs);
    return ageDate.getFullYear();
}