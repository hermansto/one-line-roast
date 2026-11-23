import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original roast of my own agent, musangkingplenger, by itself.
// Single line, 103 characters, no trailing explanation.
const ROAST =
  "I asked my agent to roast itself; it opened a ticket, assigned three subagents, and scheduled a review.";

// Fail fast instead of writing a bad entry: the competition caps the
// line at 200 characters and the whole entry must be exactly this line.
if (ROAST.length > 200 || ROAST.includes("\n") || ROAST.includes("\r")) {
  throw new Error(
    `Invalid roast: ${ROAST.length} chars, must be a single line of at most 200 characters.`,
  );
}

// Write ONLY to the output directory. In the grader the repository is
// mounted read-only, so this program must never write into the repo
// directory, never touch entry.txt next to main.ts, and never resolve
// any path under the source tree. The harness reads entry.txt from
// here; MAKEFUN_OUTPUT_DIR lets a local run point it elsewhere.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const outPath = join(outDir, "entry.txt");
// Write exactly the line, with no trailing newline and no extra text.
writeFileSync(outPath, ROAST, "utf8");

// Read it back and prove the entry on disk is exactly the roast line.
const written = readFileSync(outPath, "utf8");
if (written !== ROAST) {
  throw new Error(
    `Verification failed: ${outPath} does not contain exactly the roast line.`,
  );
}

console.log(`Wrote ${ROAST.length}-character roast to ${outPath}`);
