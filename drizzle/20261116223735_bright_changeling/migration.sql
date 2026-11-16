ALTER TABLE "projects" ADD COLUMN "year_completed" integer DEFAULT 2026 NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "description" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "description" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "technologies" SET DEFAULT '{}'::text[];--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "technologies" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "projects" ALTER COLUMN "updated_at" SET NOT NULL;