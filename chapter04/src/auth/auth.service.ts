import {Injectable}       from "@nestjs/common";
import {UsersService}     from "@/users/users.service";
import bcrypt             from "bcrypt";
import {InjectRepository} from "@nestjs/typeorm";
import {Users}            from "@/entities/Users";
import {Repository}       from "typeorm";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users) private userRepository: Repository<Users>,
    ) {
    }

    async validateUser(email: string, password: string) {
        const user = await this.userRepository.findOne({
            where: {email},
            select: ["id", "email", "password", "nickname"],
        });
        console.log(email, password, user);
        if (!user) {
            return null;
        }

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            // password를 뺀 나머지가 userWithoutPassword 임
            const {
                password,
                ...userWithoutPassword
            } = user;
            return userWithoutPassword;
        }
        return null;
    }
}
