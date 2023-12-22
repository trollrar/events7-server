import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEvent1702740284140 implements MigrationInterface {
  name = 'AddEvent1702740284140';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."event_type_enum" AS ENUM('crosspromo', 'liveops', 'app', 'ads')`,
    );
    await queryRunner.query(
      `CREATE TABLE "event" ("id" SERIAL NOT NULL, "name" character varying(48) NOT NULL, "description" character varying NOT NULL, "type" "public"."event_type_enum" NOT NULL DEFAULT 'app', "priority" smallint NOT NULL, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "event"`);
    await queryRunner.query(`DROP TYPE "public"."event_type_enum"`);
  }
}
