import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUserManagement1686975915797
  implements MigrationInterface
{
  name = 'CreateTableUserManagement1686975915797';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "user-management"."user_status_enum" AS ENUM('active', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user-management"."user" ("id" SERIAL NOT NULL, "role_id" integer NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "status" "user-management"."user_status_enum" NOT NULL, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_by" character varying, "version" integer NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user-management"."user" ("email") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user-management"."role" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" character varying NOT NULL, "updated_by" character varying, "version" integer NOT NULL, CONSTRAINT "UQ_ae4578dcaed5adff96595e61660" UNIQUE ("name"), CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "user-management"."menu_level_enum" AS ENUM('group', 'main', 'sub')`,
    );
    await queryRunner.query(
      `CREATE TYPE "user-management"."menu_url_type_enum" AS ENUM('iframe', 'hyperlink')`,
    );
    await queryRunner.query(
      `CREATE TYPE "user-management"."menu_status_enum" AS ENUM('active', 'inactive')`,
    );
    await queryRunner.query(
      `CREATE TABLE "user-management"."menu" ("id" SERIAL NOT NULL, "order_no" integer NOT NULL DEFAULT '99999', "level" "user-management"."menu_level_enum", "parent_id" integer, "name" character varying NOT NULL, "url" character varying NOT NULL, "icon" character varying NOT NULL, "url_type" "user-management"."menu_url_type_enum", "status" "user-management"."menu_status_enum" NOT NULL DEFAULT 'inactive', "editable" boolean NOT NULL DEFAULT false, "created_by" character varying NOT NULL, "updated_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "version" integer NOT NULL, CONSTRAINT "PK_35b2a8f47d153ff7a41860cceeb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "menu_order_no_idx" ON "user-management"."menu" ("order_no") `,
    );
    await queryRunner.query(
      `CREATE INDEX "menu_parent_id_idx" ON "user-management"."menu" ("parent_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "menu_level_idx" ON "user-management"."menu" ("level") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user-management"."roles_menus" ("menu_id" integer NOT NULL, "role_id" integer NOT NULL, CONSTRAINT "PK_9c4d323a6befbd42daadc185738" PRIMARY KEY ("menu_id", "role_id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ff8168f42cee8b403f7f163986" ON "user-management"."roles_menus" ("menu_id") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_27c2cb004a5b2a8f5645589831" ON "user-management"."roles_menus" ("role_id") `,
    );
    await queryRunner.query(
      `ALTER TABLE "user-management"."user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "user-management"."role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-management"."menu" ADD CONSTRAINT "FK_e5e28130fd17f88ab5ee5d3aa4c" FOREIGN KEY ("parent_id") REFERENCES "user-management"."menu"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-management"."roles_menus" ADD CONSTRAINT "FK_ff8168f42cee8b403f7f163986b" FOREIGN KEY ("menu_id") REFERENCES "user-management"."menu"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-management"."roles_menus" ADD CONSTRAINT "FK_27c2cb004a5b2a8f56455898310" FOREIGN KEY ("role_id") REFERENCES "user-management"."role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_closure" ADD CONSTRAINT "FK_2547be0cdfeccb9221c68976fd7" FOREIGN KEY ("id_ancestor") REFERENCES "user-management"."menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_closure" ADD CONSTRAINT "FK_6a0038e7e00bb09a06ba3b11319" FOREIGN KEY ("id_descendant") REFERENCES "user-management"."menu"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "menu_closure" DROP CONSTRAINT "FK_6a0038e7e00bb09a06ba3b11319"`,
    );
    await queryRunner.query(
      `ALTER TABLE "menu_closure" DROP CONSTRAINT "FK_2547be0cdfeccb9221c68976fd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-management"."roles_menus" DROP CONSTRAINT "FK_27c2cb004a5b2a8f56455898310"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-management"."roles_menus" DROP CONSTRAINT "FK_ff8168f42cee8b403f7f163986b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-management"."menu" DROP CONSTRAINT "FK_e5e28130fd17f88ab5ee5d3aa4c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user-management"."user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`,
    );
    await queryRunner.query(
      `DROP INDEX "user-management"."IDX_27c2cb004a5b2a8f5645589831"`,
    );
    await queryRunner.query(
      `DROP INDEX "user-management"."IDX_ff8168f42cee8b403f7f163986"`,
    );
    await queryRunner.query(`DROP TABLE "user-management"."roles_menus"`);
    await queryRunner.query(`DROP INDEX "user-management"."menu_level_idx"`);
    await queryRunner.query(
      `DROP INDEX "user-management"."menu_parent_id_idx"`,
    );
    await queryRunner.query(`DROP INDEX "user-management"."menu_order_no_idx"`);
    await queryRunner.query(`DROP TABLE "user-management"."menu"`);
    await queryRunner.query(`DROP TYPE "user-management"."menu_status_enum"`);
    await queryRunner.query(`DROP TYPE "user-management"."menu_url_type_enum"`);
    await queryRunner.query(`DROP TYPE "user-management"."menu_level_enum"`);
    await queryRunner.query(`DROP TABLE "user-management"."role"`);
    await queryRunner.query(
      `DROP INDEX "user-management"."IDX_e12875dfb3b1d92d7d7c5377e2"`,
    );
    await queryRunner.query(`DROP TABLE "user-management"."user"`);
    await queryRunner.query(`DROP TYPE "user-management"."user_status_enum"`);
  }
}
