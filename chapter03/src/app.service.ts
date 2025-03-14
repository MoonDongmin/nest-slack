import {
    Injectable,
}                      from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AppService {
    constructor(
        private readonly configService: ConfigService,
    ) {
    }

    async getHello() {
        // process.env  보다는 다음과 같이 사용하는 것이 좋음
        return this.configService.get("SECRET");
    }

}
