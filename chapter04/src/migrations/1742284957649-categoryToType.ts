import {
    MigrationInterface,
    QueryRunner,
} from "typeorm";

export class Migrations1742284957649 implements MigrationInterface {

    // 실제 수행할
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `mentions` RENAME COLUMN `category` TO `type`",
        );
    }

    // rollback 되는 상황
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "ALTER TABLE `mentions` RENAME COLUMN `type` TO `category`",
        )
    }

}
