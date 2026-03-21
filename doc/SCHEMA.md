# SCHEMA — IPL 2026 Viral Poster Platform

> Supabase table schemas, RLS policies, migration history.

---

## Planned Tables

### users (extends Supabase auth.users)
```sql
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  language TEXT DEFAULT 'en' CHECK (language IN ('en', 'hi', 'gu')),
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  plan_expires_at TIMESTAMPTZ,
  daily_poster_count INT DEFAULT 0,
  daily_ai_count INT DEFAULT 0,
  count_reset_at DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
-- RLS: users can read/update own profile only
```

### templates
```sql
CREATE TABLE public.templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL, -- match-day, celebration, stats, meme, business
  tier TEXT DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'premium')),
  language TEXT[] DEFAULT '{en}',
  thumbnail_url TEXT NOT NULL,
  canvas_json JSONB NOT NULL, -- Fabric.js serialized canvas
  tags TEXT[],
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);
-- RLS: all authenticated users can SELECT active templates matching their tier
```

### posters (user-created)
```sql
CREATE TABLE public.posters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  template_id UUID REFERENCES public.templates(id),
  canvas_json JSONB NOT NULL,
  image_url TEXT, -- exported image in Supabase Storage
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
-- RLS: users can CRUD own posters only
```

### match_events
```sql
CREATE TABLE public.match_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- wicket, six, century, win, loss, milestone
  team TEXT NOT NULL,
  player TEXT,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);
-- RLS: all authenticated users can SELECT; only service role can INSERT
-- Realtime: enabled for INSERT events
```

### shares
```sql
CREATE TABLE public.shares (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  poster_id UUID REFERENCES public.posters(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id),
  platform TEXT NOT NULL CHECK (platform IN ('whatsapp', 'instagram', 'twitter', 'download')),
  created_at TIMESTAMPTZ DEFAULT now()
);
-- RLS: users can INSERT own shares; service role for analytics reads
```

### subscriptions
```sql
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan TEXT NOT NULL CHECK (plan IN ('pro', 'business')),
  payment_provider TEXT, -- razorpay / stripe
  payment_id TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'expired')),
  starts_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);
-- RLS: users can SELECT own subscriptions only
```

## Storage Buckets

| Bucket | Purpose | Access |
|---|---|---|
| `templates` | Template thumbnails and assets | Public read |
| `posters` | User-exported poster images | Owner read/write |
| `avatars` | User profile avatars | Owner read/write, public read |
| `stickers` | IPL stickers, team logos, overlays | Public read |

## Migration History

| Migration | Description | Date |
|---|---|---|
| — | No migrations yet | — |
