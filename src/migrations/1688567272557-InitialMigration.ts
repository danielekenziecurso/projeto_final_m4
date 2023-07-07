import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688567272557 implements MigrationInterface {
    name = 'InitialMigration1688567272557'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_997b0a4f919e93917a1b2c35093"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_99b99ef0f6f24531a7835b14e68"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_3f4439f6b038045a04e580b5099"`);
        await queryRunner.query(`ALTER TABLE "real_estate" RENAME COLUMN "categoryld" TO "categoryId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "realEstateld"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "userid"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "realEstateId" integer`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "createdAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "updatedAt" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_ac3131bb922483053abebc5e9ff" FOREIGN KEY ("realEstateId") REFERENCES "real_estate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_19c54f24597b318be3892114c75" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_e64472d578faf91bee90a06ecc0" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_e64472d578faf91bee90a06ecc0"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_19c54f24597b318be3892114c75"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_ac3131bb922483053abebc5e9ff"`);
        await queryRunner.query(`ALTER TABLE "addresses" ALTER COLUMN "number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "updatedAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "real_estate" ALTER COLUMN "createdAt" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP COLUMN "realEstateId"`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "userid" integer`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD "realEstateld" integer`);
        await queryRunner.query(`ALTER TABLE "real_estate" RENAME COLUMN "categoryId" TO "categoryld"`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_3f4439f6b038045a04e580b5099" FOREIGN KEY ("categoryld") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_99b99ef0f6f24531a7835b14e68" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_997b0a4f919e93917a1b2c35093" FOREIGN KEY ("realEstateld") REFERENCES "real_estate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
