import { NextResponse, type NextRequest } from "next/server";
import { sql } from "@/lib/db";
import { isAuthedRequest } from "@/lib/auth";

export async function GET() {
  const rows = await sql`SELECT value FROM app_data WHERE key = 'menu'`;
  if (rows.length === 0) {
    return NextResponse.json({ categories: [], products: [] });
  }
  return NextResponse.json(rows[0].value);
}

export async function PUT(request: NextRequest) {
  if (!isAuthedRequest(request)) {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (
    !body ||
    !Array.isArray(body.categories) ||
    !Array.isArray(body.products)
  ) {
    return NextResponse.json({ error: "Geçersiz veri" }, { status: 400 });
  }

  await sql`
    INSERT INTO app_data (key, value, updated_at)
    VALUES ('menu', ${JSON.stringify(body)}::jsonb, now())
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now()
  `;

  return NextResponse.json({ ok: true });
}
