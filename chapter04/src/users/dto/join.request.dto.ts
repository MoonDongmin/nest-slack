/* dto 등을 클래스로 두는 이유
- class는 자바스크립트로 컴파일될 때 내용이 날라가지 않지만, interface는 날라감
- 왜냐면 interface는 타입스크립트에서만 쓰이는 문법이기 때문
* */
import {
    PickType,
}              from "@nestjs/swagger";
import {Users} from "@/entities/Users";

export class JoinRequestDto extends PickType(Users, [
    "email",
    "nickname",
    "password",
] as const) {
}
