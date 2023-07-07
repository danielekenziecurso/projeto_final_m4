import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1688039058646 implements MigrationInterface {
    name = 'InitialMigration1688039058646'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(45) NOT NULL, "email" character varying(45) NOT NULL, "admin" boolean NOT NULL DEFAULT false, "password" character varying(120) NOT NULL, "createdAT" date NOT NULL DEFAULT now(), "updatedAT" date NOT NULL DEFAULT now(), "deletedAT" date, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedules" ("id" SERIAL NOT NULL, "date" date NOT NULL, "hour" TIME NOT NULL, "realEstateld" integer, "userid" integer, CONSTRAINT "PK_7e33fc2ea755a5765e3564e66dd" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "real_estate" ("id" SERIAL NOT NULL, "sold" boolean NOT NULL DEFAULT false, "value" numeric(12,2) NOT NULL DEFAULT '0', "size" integer NOT NULL, "createdAt" date NOT NULL, "updatedAt" date NOT NULL, "addressid" integer, "categoryld" integer, CONSTRAINT "REL_bbff6b1334dd99e78e367d967b" UNIQUE ("addressid"), CONSTRAINT "PK_8735a23fd5adc2afb18242894ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "street" character varying(45) NOT NULL, "zipCode" character varying(8) NOT NULL, "number" character varying(7) NOT NULL, "city" character varying(20) NOT NULL, "state" character varying(2) NOT NULL, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_997b0a4f919e93917a1b2c35093" FOREIGN KEY ("realEstateld") REFERENCES "real_estate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedules" ADD CONSTRAINT "FK_99b99ef0f6f24531a7835b14e68" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_bbff6b1334dd99e78e367d967b8" FOREIGN KEY ("addressid") REFERENCES "addresses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "real_estate" ADD CONSTRAINT "FK_3f4439f6b038045a04e580b5099" FOREIGN KEY ("categoryld") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_3f4439f6b038045a04e580b5099"`);
        await queryRunner.query(`ALTER TABLE "real_estate" DROP CONSTRAINT "FK_bbff6b1334dd99e78e367d967b8"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_99b99ef0f6f24531a7835b14e68"`);
        await queryRunner.query(`ALTER TABLE "schedules" DROP CONSTRAINT "FK_997b0a4f919e93917a1b2c35093"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "real_estate"`);
        await queryRunner.query(`DROP TABLE "schedules"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
