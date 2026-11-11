import initSqlJs from 'sql.js/dist/sql-asm.js';
import {readPage} from './queries';

async function openCatalogue() {
  const [SQL, response] = await Promise.all([initSqlJs(), fetch('/studio-data/catalogue.bin')]);
  if (!response.ok || !response.body) throw new Error('Katalogu nuk u shkarkua.');
  const stream = response.body.pipeThrough(new DecompressionStream('gzip'));
  const sqlite = new SQL.Database(new Uint8Array(await new Response(stream).arrayBuffer()));
  return {
    prepare(sql: string) {
      let args: unknown[] = [];
      function query(first: boolean) {
        const statement = sqlite.prepare(sql);
        try {
          statement.bind(args);
          if (first) return statement.step() ? statement.getAsObject() : null;
          const results = [];
          while (statement.step()) results.push(statement.getAsObject());
          return {results};
        } finally { statement.free(); }
      }
      return {
        bind(...values: unknown[]) {args = values; return this;},
        first: () => query(true),
        all: () => query(false),
        run: () => sqlite.run(sql, args)
      };
    }
  };
}
let pending: ReturnType<typeof openCatalogue> | undefined;
export async function catalogueRequest(route: string, method='GET') {
  if (method !== 'GET') throw new Error('Ndryshimet në katalog kërkojnë akses administratori.');
  if (route === 'session') return {isAdmin:false, authenticated:false};
  if (route === 'ai/status') return {configured:false};
  pending ??= openCatalogue().catch(error=>{pending=undefined;throw error});
  const db = await pending;
  if (route === 'catalogue-sync') return {completed:true};
  const url = new URL(route,'https://catalogue.local/');
  const response = await readPage(db,url.pathname.slice(1),url.searchParams);
  const data = await response.json();
  if (!response.ok) throw new Error(data.error);
  return data;
}
