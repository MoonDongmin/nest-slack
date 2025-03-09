import {Injectable}    from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

// 비즈니스 로직 구현
// 요청, 응답에 대해서는 모름
@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigService) {
    }

    async getHello() {
        // process.env  보다는 다음과 같이 사용하는 것이 좋음
        return this.configService.get("SECRET");
    }

}
