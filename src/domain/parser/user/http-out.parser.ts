import { UserHttpOutputTO } from "../../to/user"
import { User } from "../../user"

export const parse = (user: User): UserHttpOutputTO => {
    return {
        name : user.name,
        age : user.age.toLocaleString(),
        created : new Date().toISOString()
    }
}