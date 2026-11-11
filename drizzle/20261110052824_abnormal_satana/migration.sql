CREATE TABLE "projects" (
	"id" serial PRIMARY KEY,
	"title" varchar(255) NOT NULL,
	"description" text,
	"type" varchar(20) NOT NULL,
	"technologies" text[],
	"link" varchar(500) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "projects_type_check" CHECK ("type" in ('opensource', 'school'))
);
