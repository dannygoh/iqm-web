import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TYPE "public"."enum_documents_category" AS ENUM('Membership Forms', 'MRCA Documents', 'Circulars', 'Programmes', 'Announcements');
  CREATE TYPE "public"."enum_members_member_type" AS ENUM('Fellow', 'Member', 'Associate', 'Affiliate', 'Student', 'Company', 'Life', 'Honorary Fellow');
  CREATE TYPE "public"."enum_members_status" AS ENUM('Active', 'Inactive');
  CREATE TYPE "public"."enum_auditors_grade" AS ENUM('Principal Auditor', 'Lead Auditor', 'Senior Auditor', 'Auditor', 'Provisional Auditor', 'Internal Quality Auditor');
  CREATE TYPE "public"."enum_auditors_status" AS ENUM('Active', 'Inactive');
  CREATE TYPE "public"."enum_consultants_status" AS ENUM('Active', 'Inactive');
  CREATE TABLE "users_sessions" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "created_at" timestamp(3) with time zone,
        "expires_at" timestamp(3) with time zone NOT NULL
  );

  CREATE TABLE "users" (
        "id" serial PRIMARY KEY NOT NULL,
        "role" "enum_users_role" DEFAULT 'editor' NOT NULL,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "email" varchar NOT NULL,
        "reset_password_token" varchar,
        "reset_password_expiration" timestamp(3) with time zone,
        "salt" varchar,
        "hash" varchar,
        "login_attempts" numeric DEFAULT 0,
        "lock_until" timestamp(3) with time zone
  );

  CREATE TABLE "pages" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" varchar NOT NULL,
        "slug" varchar NOT NULL,
        "content" jsonb,
        "meta_description" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "announcements_attachments" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "file_id" integer NOT NULL,
        "label" varchar
  );

  CREATE TABLE "announcements" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" varchar NOT NULL,
        "date" timestamp(3) with time zone NOT NULL,
        "content" jsonb,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "gallery_albums_images" (
        "_order" integer NOT NULL,
        "_parent_id" integer NOT NULL,
        "id" varchar PRIMARY KEY NOT NULL,
        "image_id" integer NOT NULL,
        "caption" varchar
  );

  CREATE TABLE "gallery_albums" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" varchar NOT NULL,
        "description" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "documents" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "category" "enum_documents_category" NOT NULL,
        "description" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "url" varchar,
        "thumbnail_u_r_l" varchar,
        "filename" varchar,
        "mime_type" varchar,
        "filesize" numeric,
        "width" numeric,
        "height" numeric,
        "focal_x" numeric,
        "focal_y" numeric
  );

  CREATE TABLE "events" (
        "id" serial PRIMARY KEY NOT NULL,
        "title" varchar NOT NULL,
        "date" timestamp(3) with time zone NOT NULL,
        "end_date" timestamp(3) with time zone,
        "location" varchar,
        "description" jsonb,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "members" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "member_type" "enum_members_member_type" NOT NULL,
        "status" "enum_members_status" DEFAULT 'Active' NOT NULL,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "auditors" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "grade" "enum_auditors_grade" NOT NULL,
        "registration_number" varchar,
        "status" "enum_auditors_status" DEFAULT 'Active' NOT NULL,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "consultants" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar NOT NULL,
        "registration_number" varchar,
        "status" "enum_consultants_status" DEFAULT 'Active' NOT NULL,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "media" (
        "id" serial PRIMARY KEY NOT NULL,
        "alt" varchar NOT NULL,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "url" varchar,
        "thumbnail_u_r_l" varchar,
        "filename" varchar,
        "mime_type" varchar,
        "filesize" numeric,
        "width" numeric,
        "height" numeric,
        "focal_x" numeric,
        "focal_y" numeric,
        "sizes_thumbnail_url" varchar,
        "sizes_thumbnail_width" numeric,
        "sizes_thumbnail_height" numeric,
        "sizes_thumbnail_mime_type" varchar,
        "sizes_thumbnail_filesize" numeric,
        "sizes_thumbnail_filename" varchar,
        "sizes_card_url" varchar,
        "sizes_card_width" numeric,
        "sizes_card_height" numeric,
        "sizes_card_mime_type" varchar,
        "sizes_card_filesize" numeric,
        "sizes_card_filename" varchar
  );

  CREATE TABLE "payload_kv" (
        "id" serial PRIMARY KEY NOT NULL,
        "key" varchar NOT NULL,
        "data" jsonb NOT NULL
  );

  CREATE TABLE "payload_locked_documents" (
        "id" serial PRIMARY KEY NOT NULL,
        "global_slug" varchar,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_locked_documents_rels" (
        "id" serial PRIMARY KEY NOT NULL,
        "order" integer,
        "parent_id" integer NOT NULL,
        "path" varchar NOT NULL,
        "users_id" integer,
        "pages_id" integer,
        "announcements_id" integer,
        "gallery_albums_id" integer,
        "documents_id" integer,
        "events_id" integer,
        "members_id" integer,
        "auditors_id" integer,
        "consultants_id" integer,
        "media_id" integer
  );

  CREATE TABLE "payload_preferences" (
        "id" serial PRIMARY KEY NOT NULL,
        "key" varchar,
        "value" jsonb,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "payload_preferences_rels" (
        "id" serial PRIMARY KEY NOT NULL,
        "order" integer,
        "parent_id" integer NOT NULL,
        "path" varchar NOT NULL,
        "users_id" integer
  );

  CREATE TABLE "payload_migrations" (
        "id" serial PRIMARY KEY NOT NULL,
        "name" varchar,
        "batch" numeric,
        "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
        "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );

  CREATE TABLE "site_settings" (
        "id" serial PRIMARY KEY NOT NULL,
        "org_name" varchar DEFAULT 'Institute of Quality Malaysia',
        "tagline" varchar,
        "address" varchar,
        "phone" varchar,
        "fax" varchar,
        "email" varchar,
        "updated_at" timestamp(3) with time zone,
        "created_at" timestamp(3) with time zone
  );

  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "announcements_attachments" ADD CONSTRAINT "announcements_attachments_file_id_documents_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."documents"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "announcements_attachments" ADD CONSTRAINT "announcements_attachments_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "gallery_albums_images" ADD CONSTRAINT "gallery_albums_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "gallery_albums_images" ADD CONSTRAINT "gallery_albums_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."gallery_albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY ("pages_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_announcements_fk" FOREIGN KEY ("announcements_id") REFERENCES "public"."announcements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_albums_fk" FOREIGN KEY ("gallery_albums_id") REFERENCES "public"."gallery_albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY ("documents_id") REFERENCES "public"."documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_members_fk" FOREIGN KEY ("members_id") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_auditors_fk" FOREIGN KEY ("auditors_id") REFERENCES "public"."auditors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_consultants_fk" FOREIGN KEY ("consultants_id") REFERENCES "public"."consultants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "pages_slug_idx" ON "pages" USING btree ("slug");
  CREATE INDEX "pages_updated_at_idx" ON "pages" USING btree ("updated_at");
  CREATE INDEX "pages_created_at_idx" ON "pages" USING btree ("created_at");
  CREATE INDEX "announcements_attachments_order_idx" ON "announcements_attachments" USING btree ("_order");
  CREATE INDEX "announcements_attachments_parent_id_idx" ON "announcements_attachments" USING btree ("_parent_id");
  CREATE INDEX "announcements_attachments_file_idx" ON "announcements_attachments" USING btree ("file_id");
  CREATE INDEX "announcements_updated_at_idx" ON "announcements" USING btree ("updated_at");
  CREATE INDEX "announcements_created_at_idx" ON "announcements" USING btree ("created_at");
  CREATE INDEX "gallery_albums_images_order_idx" ON "gallery_albums_images" USING btree ("_order");
  CREATE INDEX "gallery_albums_images_parent_id_idx" ON "gallery_albums_images" USING btree ("_parent_id");
  CREATE INDEX "gallery_albums_images_image_idx" ON "gallery_albums_images" USING btree ("image_id");
  CREATE INDEX "gallery_albums_updated_at_idx" ON "gallery_albums" USING btree ("updated_at");
  CREATE INDEX "gallery_albums_created_at_idx" ON "gallery_albums" USING btree ("created_at");
  CREATE INDEX "documents_updated_at_idx" ON "documents" USING btree ("updated_at");
  CREATE INDEX "documents_created_at_idx" ON "documents" USING btree ("created_at");
  CREATE UNIQUE INDEX "documents_filename_idx" ON "documents" USING btree ("filename");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "members_updated_at_idx" ON "members" USING btree ("updated_at");
  CREATE INDEX "members_created_at_idx" ON "members" USING btree ("created_at");
  CREATE INDEX "auditors_updated_at_idx" ON "auditors" USING btree ("updated_at");
  CREATE INDEX "auditors_created_at_idx" ON "auditors" USING btree ("created_at");
  CREATE INDEX "consultants_updated_at_idx" ON "consultants" USING btree ("updated_at");
  CREATE INDEX "consultants_created_at_idx" ON "consultants" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
  CREATE INDEX "payload_locked_documents_rels_announcements_id_idx" ON "payload_locked_documents_rels" USING btree ("announcements_id");
  CREATE INDEX "payload_locked_documents_rels_gallery_albums_id_idx" ON "payload_locked_documents_rels" USING btree ("gallery_albums_id");
  CREATE INDEX "payload_locked_documents_rels_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("documents_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_members_id_idx" ON "payload_locked_documents_rels" USING btree ("members_id");
  CREATE INDEX "payload_locked_documents_rels_auditors_id_idx" ON "payload_locked_documents_rels" USING btree ("auditors_id");
  CREATE INDEX "payload_locked_documents_rels_consultants_id_idx" ON "payload_locked_documents_rels" USING btree ("consultants_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "pages" CASCADE;
  DROP TABLE "announcements_attachments" CASCADE;
  DROP TABLE "announcements" CASCADE;
  DROP TABLE "gallery_albums_images" CASCADE;
  DROP TABLE "gallery_albums" CASCADE;
  DROP TABLE "documents" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "members" CASCADE;
  DROP TABLE "auditors" CASCADE;
  DROP TABLE "consultants" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "site_settings" CASCADE;
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_documents_category";
  DROP TYPE "public"."enum_members_member_type";
  DROP TYPE "public"."enum_members_status";
  DROP TYPE "public"."enum_auditors_grade";
  DROP TYPE "public"."enum_auditors_status";
  DROP TYPE "public"."enum_consultants_status";`)
}
