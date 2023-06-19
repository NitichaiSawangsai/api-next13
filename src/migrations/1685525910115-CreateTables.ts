import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTables1685525910115 implements MigrationInterface {
  name = 'CreateTables1685525910115';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA "user-management"`);
    await queryRunner.query(
      `CREATE TABLE "company" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_by" character varying(255) NOT NULL, "updated_by" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_056f7854a7afdba7cbd6d45fc20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "section" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_by" character varying(255) NOT NULL, "updated_by" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3c41d2d699384cc5e8eac54777d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee_group" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_by" character varying(255) NOT NULL, "updated_by" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_5348897f7b1e104da40036264f1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "scg_position" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_by" character varying(255) NOT NULL, "updated_by" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6839a02310cbd38a484b72693d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sub_division" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_by" character varying(255) NOT NULL, "updated_by" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_1d7588de27f71a5fb1636842f36" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "scg_department" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_by" character varying(255) NOT NULL, "updated_by" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b47242c9ce9074cf642d92a345e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "do_department" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_by" character varying(255) NOT NULL, "updated_by" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_4c807325bdf134f14ca766381dd" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workforce" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_by" character varying(255) NOT NULL, "updated_by" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0284a6d21d24b590cb1ab29d684" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_status" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_by" character varying(255) NOT NULL, "updated_by" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_625ed5469429a6b32e34ba9f827" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee_type" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_by" character varying(255) NOT NULL, "updated_by" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f9d58855715d2ef972426e8bfef" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_group" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_by" character varying(255) NOT NULL, "updated_by" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e1f2447856b1b853e98bcd8508b" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "project_type" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "created_by" character varying(255) NOT NULL, "updated_by" character varying(255) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_2a06e25261f5e8eb431d3683931" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "project_type"`);
    await queryRunner.query(`DROP TABLE "project_group"`);
    await queryRunner.query(`DROP TABLE "employee_type"`);
    await queryRunner.query(`DROP TABLE "project_status"`);
    await queryRunner.query(`DROP TABLE "workforce"`);
    await queryRunner.query(`DROP TABLE "do_department"`);
    await queryRunner.query(`DROP TABLE "scg_department"`);
    await queryRunner.query(`DROP TABLE "sub_division"`);
    await queryRunner.query(`DROP TABLE "scg_position"`);
    await queryRunner.query(`DROP TABLE "employee_group"`);
    await queryRunner.query(`DROP TABLE "section"`);
    await queryRunner.query(`DROP TABLE "company"`);
  }
}
