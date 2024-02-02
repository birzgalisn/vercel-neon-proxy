import { sql } from "@vercel/postgres";

const { rows } = await sql`SELECT * FROM NOW()`;

console.log(rows);
