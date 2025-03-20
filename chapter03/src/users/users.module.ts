import {Module}          from "@nestjs/common";
import {UsersService}    from "@/users/users.service";
import {UsersController} from "@/users/users.controller";
import {TypeOrmModule}   from "@nestjs/typeorm";
import {Users}           from "@/entities/Users";

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {
}
