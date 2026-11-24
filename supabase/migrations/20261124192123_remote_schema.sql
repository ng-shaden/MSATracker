SET local check_function_bodies = off;

CREATE EXTENSION "pg_cron";

CREATE EXTENSION "pg_net" SCHEMA "extensions";

CREATE TABLE "public"."favorites" (
  "user_id"  uuid                     NOT NULL,
  "media_id" uuid                     NOT NULL,
  "added_at" timestamp with time zone DEFAULT now(),
  CONSTRAINT "favorites_pkey" PRIMARY KEY (user_id, media_id)
);

ALTER TABLE "public"."favorites"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."media" (
  "media_id" uuid    NOT NULL DEFAULT gen_random_uuid(),
  "tmdb_id"  integer NOT NULL,
  CONSTRAINT "media_pkey" PRIMARY KEY (media_id)
);

ALTER TABLE "public"."media"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."personal_preferences" (
  "personal_preferences_id"  uuid    NOT NULL DEFAULT gen_random_uuid(),
  "user_id"                  uuid    NOT NULL,
  "show_media_backdrop"      boolean NOT NULL DEFAULT false,
  "username_as_display_name" boolean NOT NULL DEFAULT true,
  "show_extra_labels"        boolean NOT NULL DEFAULT true,
  CONSTRAINT "personal_preferences_pkey" PRIMARY KEY (personal_preferences_id),
  CONSTRAINT "personal_preferences_user_id_key" UNIQUE (user_id)
);

ALTER TABLE "public"."personal_preferences"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."user_media" (
  "user_id"  uuid NOT NULL,
  "media_id" uuid NOT NULL,
  CONSTRAINT "user_media_pkey" PRIMARY KEY (user_id, media_id)
);

ALTER TABLE "public"."user_media"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."users" (
  "user_id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "username"        character varying        NOT NULL,
  "first_name"      character varying,
  "last_name"       character varying,
  "email"           character varying        NOT NULL,
  "profile_picture" character varying,
  "deleted_at"      timestamp with time zone,
  CONSTRAINT "Users_email_key" UNIQUE (email),
  CONSTRAINT "Users_pkey" PRIMARY KEY (user_id),
  CONSTRAINT "Users_username_key" UNIQUE (username)
);

ALTER TABLE "public"."users"
  ENABLE ROW LEVEL SECURITY;

CREATE TYPE "public"."media_type" AS ENUM (
  'movie',
  'series'
);

ALTER TABLE "public"."media"
  ADD COLUMN "media_type" public.media_type NOT NULL;

CREATE TYPE "public"."user_media_status" AS ENUM (
  'watchlist',
  'currently_watching',
  'completed'
);

ALTER TABLE "public"."user_media"
  ADD COLUMN "status" public.user_media_status NOT NULL;

ALTER TABLE "public"."user_media"
  ADD COLUMN "added_at" timestamp WITH time zone DEFAULT now();

ALTER TABLE "public"."user_media"
  ADD COLUMN "completed_at" timestamp WITH time zone;

ALTER TABLE "public"."user_media"
  ADD COLUMN "started_at" timestamp WITH time zone;

CREATE OR REPLACE FUNCTION public.delete_my_account()
  RETURNS void
  LANGUAGE sql
  SECURITY DEFINER
  SET search_path TO ''
  AS $function$
  update public.users
    set deleted_at = now()
    where user_id = (select auth.uid());

  update auth.users
    set banned_until = now() + interval '100 years'
    where id = (select auth.uid());
$function$;

REVOKE ALL ON FUNCTION "public"."delete_my_account"() FROM PUBLIC, "anon";

CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO ''
  AS $function$
BEGIN
    -- Create the user profile
    INSERT INTO public.users (
        user_id,
        username,
        first_name,
        last_name,
        email
    )
    VALUES (
        NEW.id,
        NEW.raw_user_meta_data ->> 'username',
        NEW.raw_user_meta_data ->> 'first_name',
        NEW.raw_user_meta_data ->> 'last_name',
        NEW.email
    );

    -- Create default personal preferences
    INSERT INTO public.personal_preferences (
        user_id
    )
    VALUES (
        NEW.id
    );

    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.is_account_active()
  RETURNS boolean
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path TO ''
  AS $function$
    select exists (
        select 1
        from public.users
        where user_id = (select auth.uid())
        and deleted_at is null
    );
$function$;

REVOKE ALL ON FUNCTION "public"."is_account_active"() FROM PUBLIC, "anon";

CREATE OR REPLACE FUNCTION public.is_username_taken (
  check_username text
)
  RETURNS boolean
  LANGUAGE sql
  STABLE
  SECURITY DEFINER
  SET search_path TO ''
  AS $function$
    SELECT EXISTS (
        SELECT 1
        FROM public.users
        WHERE username = check_username
    );
$function$;

ALTER TABLE "public"."favorites"
  ADD CONSTRAINT "favorites_media_id_fkey" FOREIGN KEY (media_id) REFERENCES public.media(media_id);

ALTER TABLE "public"."user_media"
  ADD CONSTRAINT "user_media_media_id_fkey" FOREIGN KEY (media_id) REFERENCES public.media(media_id);

ALTER TABLE "public"."favorites"
  ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;

ALTER TABLE "public"."personal_preferences"
  ADD CONSTRAINT "personal_preferences_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;

ALTER TABLE "public"."user_media"
  ADD CONSTRAINT "user_media_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;

ALTER TABLE "public"."users"
  ADD CONSTRAINT "users_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE POLICY "Users can add own favorites" ON "public"."favorites"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (((( SELECT auth.uid() AS uid) = user_id) AND ( SELECT public.is_account_active() AS is_account_active)));

CREATE POLICY "Users can delete own favorites" ON "public"."favorites"
  FOR DELETE
  TO "authenticated"
  USING (((( SELECT auth.uid() AS uid) = user_id) AND ( SELECT public.is_account_active() AS is_account_active)));

CREATE POLICY "Users can read own favorites" ON "public"."favorites"
  FOR SELECT
  TO "authenticated"
  USING (((( SELECT auth.uid() AS uid) = user_id) AND ( SELECT public.is_account_active() AS is_account_active)));

CREATE POLICY "Anyone can read media" ON "public"."media"
  FOR SELECT
  TO "anon", "authenticated"
  USING (true);

CREATE POLICY "Authenticated users can insert media" ON "public"."media"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (( SELECT public.is_account_active() AS is_account_active));

CREATE POLICY "Users can read their own preferences" ON "public"."personal_preferences"
  FOR SELECT
  TO "authenticated"
  USING (((( SELECT auth.uid() AS uid) = user_id) AND ( SELECT public.is_account_active() AS is_account_active)));

CREATE POLICY "Users can update their own preferences" ON "public"."personal_preferences"
  FOR UPDATE
  TO "authenticated"
  USING (((( SELECT auth.uid() AS uid) = user_id) AND ( SELECT public.is_account_active() AS is_account_active)))
  WITH CHECK (((( SELECT auth.uid() AS uid) = user_id) AND ( SELECT public.is_account_active() AS is_account_active)));

CREATE POLICY "Users can add to own library" ON "public"."user_media"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (((( SELECT auth.uid() AS uid) = user_id) AND ( SELECT public.is_account_active() AS is_account_active)));

CREATE POLICY "Users can delete from own library" ON "public"."user_media"
  FOR DELETE
  TO "authenticated"
  USING (((( SELECT auth.uid() AS uid) = user_id) AND ( SELECT public.is_account_active() AS is_account_active)));

CREATE POLICY "Users can read own library" ON "public"."user_media"
  FOR SELECT
  TO "authenticated"
  USING (((( SELECT auth.uid() AS uid) = user_id) AND ( SELECT public.is_account_active() AS is_account_active)));

CREATE POLICY "Users can update own library" ON "public"."user_media"
  FOR UPDATE
  TO "authenticated"
  USING (((( SELECT auth.uid() AS uid) = user_id) AND ( SELECT public.is_account_active() AS is_account_active)))
  WITH CHECK (((( SELECT auth.uid() AS uid) = user_id) AND ( SELECT public.is_account_active() AS is_account_active)));

CREATE POLICY "Users can read own profile" ON "public"."users"
  FOR SELECT
  TO "authenticated"
  USING (((user_id = ( SELECT auth.uid() AS uid)) AND ( SELECT public.is_account_active() AS is_account_active)));

CREATE POLICY "Users can update own profile" ON "public"."users"
  FOR UPDATE
  TO "authenticated"
  USING (((( SELECT auth.uid() AS uid) = user_id) AND ( SELECT public.is_account_active() AS is_account_active)))
  WITH CHECK (((( SELECT auth.uid() AS uid) = user_id) AND ( SELECT public.is_account_active() AS is_account_active)));

CREATE POLICY "Users can update their own profile pictures" ON "storage"."objects"
  FOR UPDATE
  TO "authenticated"
  USING (((bucket_id = 'profile-pictures'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)))
  WITH CHECK (((bucket_id = 'profile-pictures'::text) AND ((storage.foldername(name))[1] = (auth.uid())::text)));

CREATE POLICY "Users can upload their own profile pictures" ON "storage"."objects"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (((bucket_id = 'profile-pictures'::text) AND ((storage.foldername(name))[1] = (( SELECT auth.uid() AS uid))::text)));

CREATE POLICY "Users can view their own profile pictures" ON "storage"."objects"
  FOR SELECT
  TO "authenticated"
  USING (((bucket_id = 'profile-pictures'::text) AND ((storage.foldername(name))[1] = (( SELECT auth.uid() AS uid))::text)));

COMMENT ON EXTENSION "pg_cron" IS 'Job scheduler for PostgreSQL';

COMMENT ON EXTENSION "pg_net" IS 'Async HTTP';

GRANT EXECUTE ON FUNCTION "public"."delete_my_account"() TO "authenticated";

REVOKE ALL ON FUNCTION "public"."delete_my_account"() FROM "postgres";

GRANT EXECUTE ON FUNCTION "public"."delete_my_account"() TO "postgres";

GRANT EXECUTE ON FUNCTION "public"."delete_my_account"() TO "service_role";

GRANT EXECUTE ON FUNCTION "public"."handle_new_user"() TO PUBLIC, "anon", "authenticated";

REVOKE ALL ON FUNCTION "public"."handle_new_user"() FROM "postgres";

GRANT EXECUTE ON FUNCTION "public"."handle_new_user"() TO "postgres";

GRANT EXECUTE ON FUNCTION "public"."handle_new_user"() TO "service_role";

GRANT EXECUTE ON FUNCTION "public"."is_account_active"() TO "authenticated";

REVOKE ALL ON FUNCTION "public"."is_account_active"() FROM "postgres";

GRANT EXECUTE ON FUNCTION "public"."is_account_active"() TO "postgres";

GRANT EXECUTE ON FUNCTION "public"."is_account_active"() TO "service_role";

REVOKE ALL ON FUNCTION "public"."is_username_taken"(text) FROM PUBLIC;

GRANT EXECUTE ON FUNCTION "public"."is_username_taken"(text) TO "anon", "authenticated";

REVOKE ALL ON FUNCTION "public"."is_username_taken"(text) FROM "postgres";

GRANT EXECUTE ON FUNCTION "public"."is_username_taken"(text) TO "postgres";

GRANT EXECUTE ON FUNCTION "public"."is_username_taken"(text) TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."favorites" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."favorites" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."favorites" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."favorites" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."media" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."media" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."media" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."media" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."personal_preferences" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."personal_preferences" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."personal_preferences" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."personal_preferences" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."user_media" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."user_media" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."user_media" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."user_media" TO "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."users" TO "anon", "authenticated";

REVOKE ALL ON TABLE "public"."users" FROM "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."users" TO "postgres";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."users" TO "service_role";

SELECT cron.schedule_in_database('delete-expired-users-daily', '0 3 * * *', 'SELECT net.http_post(
    url := (
        SELECT decrypted_secret
        FROM vault.decrypted_secrets
        WHERE name = ''PROJECT_URL''
    ) || ''/functions/v1/delete-expired-users'',

    headers := jsonb_build_object(
        ''Content-Type'', ''application/json'',
        ''apikey'', (
            SELECT decrypted_secret
            FROM vault.decrypted_secrets
            WHERE name = ''PUBLISHABLE_KEY''
        ),
        ''Authorization'', ''Bearer '' || (
            SELECT decrypted_secret
            FROM vault.decrypted_secrets
            WHERE name = ''CRON_SECRET''
        )
    ),

    body := ''{}''::jsonb,
    
    timeout_milliseconds := 30000
);', 'postgres', NULL, true);

