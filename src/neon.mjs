import { neon, neonConfig } from "@neondatabase/serverless";

const { POSTGRES_URL, NEON_PROXY_HOST, NEON_PROXY_PORT } = process.env;

neonConfig.fetchEndpoint = function (host) {
  const isNeonProxy = host === NEON_PROXY_HOST;
  const protocol = isNeonProxy ? "http" : "https";
  const port = isNeonProxy ? NEON_PROXY_PORT : 443;
  return `${protocol}://${host}:${port}/sql`;
};

const sql = neon(POSTGRES_URL);
const [result] = await sql`SELECT * FROM NOW()`;

console.log(result);
