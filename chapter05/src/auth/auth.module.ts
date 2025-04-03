import {Module}          from "@nestjs/common";
import {PassportModule}  from "@nestjs/passport";
import {TypeOrmModule}   from "@nestjs/typeorm";
import {Users}           from "@/entities/Users";
import {AuthService}     from "@/auth/auth.service";
import {LocalStrategy}   from "@/auth/local.strategy";
import {LocalSerializer} from "@/auth/local.serializer";
import {UsersModule}     from "@/users/users.module";

@Module({
    imports: [
        // JWT 토큰을 하려면 session을 false로 해야 함
        PassportModule.register({session: true}),
        TypeOrmModule.forFeature([Users]),
        UsersModule,
    ],
    providers: [AuthService, LocalStrategy, LocalSerializer],
})
export class AuthModule {
}
