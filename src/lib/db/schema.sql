-- Tabla para miembros de la asociación
CREATE TABLE IF NOT EXISTS members (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  message TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índice para búsquedas por email
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);

-- Tabla opcional para analytics del blog
CREATE TABLE IF NOT EXISTS blog_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL,
  viewed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Índice para analytics
CREATE INDEX IF NOT EXISTS idx_blog_views_slug ON blog_views(slug);
CREATE INDEX IF NOT EXISTS idx_blog_views_date ON blog_views(viewed_at);
