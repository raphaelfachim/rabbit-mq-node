import { UserHttpOutputTO } from "../../to/user"
import { User } from "../../user.entity"

export const parse = (user: User): UserHttpOutputTO => {
    return {
        name : user.name,
        age : user.age.toString(),
        created : user.createdAt.toISOString(),
    }
}