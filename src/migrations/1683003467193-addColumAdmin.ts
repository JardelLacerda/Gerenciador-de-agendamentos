import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumAdmin1683003467193 implements MigrationInterface {
    name = 'AddColumAdmin1683003467193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "admin" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(45) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(60) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "admin"`);
    }

}
