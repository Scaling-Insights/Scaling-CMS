import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1736588275107 implements MigrationInterface {
    name = 'Initial1736588275107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" bigint NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("tagName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_334b5e2238470c6f0f124e60ccd" PRIMARY KEY ("tagName"))`);
        await queryRunner.query(`CREATE TYPE "public"."content_publicationstatus_enum" AS ENUM('public', 'private')`);
        await queryRunner.query(`CREATE TYPE "public"."content_type_enum" AS ENUM('short')`);
        await queryRunner.query(`CREATE TABLE "content" ("id" bigint NOT NULL, "title" character varying NOT NULL, "publicationStatus" "public"."content_publicationstatus_enum" NOT NULL, "type" "public"."content_type_enum" NOT NULL, "contentItemID" bigint NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userIDId" bigint, CONSTRAINT "PK_6a2083913f3647b44f205204e36" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "content_tag" ("contentID" bigint NOT NULL, "tagName" character varying NOT NULL, CONSTRAINT "PK_3712f8b39b2823e76130ac526b0" PRIMARY KEY ("contentID", "tagName"))`);
        await queryRunner.query(`CREATE TABLE "short" ("id" bigint NOT NULL, "videoLength" integer NOT NULL, "streamUID" character varying NOT NULL, "description" character varying, "thumbnailLink" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_87ec3401b7e78c5703f3ebd6ce6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "content" ADD CONSTRAINT "FK_3c187e9095639d85ab1873a25fc" FOREIGN KEY ("userIDId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "content_tag" ADD CONSTRAINT "FK_8d65901e220d949b99400d82560" FOREIGN KEY ("contentID") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "content_tag" ADD CONSTRAINT "FK_dd30f2d6f1a7d8c722609f268ad" FOREIGN KEY ("tagName") REFERENCES "tag"("tagName") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "content_tag" DROP CONSTRAINT "FK_dd30f2d6f1a7d8c722609f268ad"`);
        await queryRunner.query(`ALTER TABLE "content_tag" DROP CONSTRAINT "FK_8d65901e220d949b99400d82560"`);
        await queryRunner.query(`ALTER TABLE "content" DROP CONSTRAINT "FK_3c187e9095639d85ab1873a25fc"`);
        await queryRunner.query(`DROP TABLE "short"`);
        await queryRunner.query(`DROP TABLE "content_tag"`);
        await queryRunner.query(`DROP TABLE "content"`);
        await queryRunner.query(`DROP TYPE "public"."content_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."content_publicationstatus_enum"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
