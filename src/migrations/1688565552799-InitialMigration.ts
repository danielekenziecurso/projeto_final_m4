import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688565552799 implements MigrationInterface {
    name = 'InitialMigration1688565552799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_3f4439f6b038045a04e580b5099"`);
        await queryRunner.query(`ALTER TABLE "real_estate" RENAME COLUMN "categoryld" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_e64472d578faf91bee90a06ecc0" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_e64472d578faf91bee90a06ecc0"`);
        await queryRunner.query(`ALTER TABLE "real_estate" RENAME COLUMN "categoryId" TO "categoryld"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_3f4439f6b038045a04e580b5099" FOREIGN KEY ("categoryld") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
