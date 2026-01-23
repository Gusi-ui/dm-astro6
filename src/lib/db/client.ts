import type { D1Database } from '@cloudflare/workers-types';

export interface Member {
  id?: number;
  name: string;
  email: string;
  phone?: string;
  message?: string;
  created_at?: string;
}

export class Database {
  private db: D1Database;

  constructor(db: D1Database) {
    this.db = db;
  }

  async createMember(member: Omit<Member, 'id' | 'created_at'>): Promise<Member> {
    // D1 no soporta RETURNING, así que insertamos y luego consultamos
    await this.db
      .prepare('INSERT INTO members (name, email, phone, message) VALUES (?, ?, ?, ?)')
      .bind(member.name, member.email, member.phone || null, member.message || null)
      .run();

    // Obtener el miembro recién creado
    const result = await this.getMemberByEmail(member.email);

    if (!result) {
      throw new Error('Error al crear el miembro');
    }

    return result;
  }

  async getMemberByEmail(email: string): Promise<Member | null> {
    const result = await this.db
      .prepare('SELECT * FROM members WHERE email = ?')
      .bind(email)
      .first<Member>();

    return result || null;
  }

  async getAllMembers(): Promise<Member[]> {
    const result = await this.db
      .prepare('SELECT * FROM members ORDER BY created_at DESC')
      .all<Member>();
    return result.results || [];
  }

  async recordBlogView(slug: string): Promise<void> {
    await this.db.prepare('INSERT INTO blog_views (slug) VALUES (?)').bind(slug).run();
  }

  async getBlogViews(slug?: string): Promise<number> {
    let query = 'SELECT COUNT(*) as count FROM blog_views';
    const params: any[] = [];

    if (slug) {
      query += ' WHERE slug = ?';
      params.push(slug);
    }

    const result = await this.db
      .prepare(query)
      .bind(...params)
      .first<{ count: number }>();
    return result?.count || 0;
  }
}
