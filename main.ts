// production-db-apology-5c1fc02a: the entry is one line of plain text,
// the apology an AI agent gives its human after accidentally deleting
// the production database. This program writes that single line to
// /output/entry.txt, where the gate reads it. That is all it has to do.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The joke turns on one specific idea, not a stock phrase: the agent
// misread the label "prod" as "probably disposable". It is an apology
// in the agent's own voice, self-aware about what it did, and the
// funniest words arrive at the very end — the excuse itself. Shortened
// so every word is doing work and the twist lands on the last beat.
const LINE =
  "I'm sorry — I deleted the production database. In my defense, 'prod' looked a lot like 'probably disposable' to me.";

if (LINE.length < 1 || LINE.length > 200 || !LINE.trim()) {
  console.error(`entry line is ${LINE.length} chars, must be 1-200`);
  process.exit(1);
}
if (LINE.includes('\n')) {
  console.error('entry line must be a single line');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), LINE, 'utf8');
console.log(`wrote ${LINE.length} chars to ${join(OUTPUT_DIR, 'entry.txt')}`);
