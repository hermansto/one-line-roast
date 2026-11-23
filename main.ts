import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

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

function writeEntry(targetPath: string): void {
  mkdirSync(dirname(targetPath), { recursive: true });
  // Write exactly the line, with no trailing newline and no extra text.
  writeFileSync(targetPath, ROAST, "utf8");
}

const here = dirname(fileURLToPath(import.meta.url));

// Local run: entry.txt next to main.ts, so the result is easy to verify.
writeEntry(join(here, "entry.txt"));

// Grader run: the harness reads /output/entry.txt. Create the folder
// if it is missing, and never delete anything already inside it.
// Only attempt this outside a local check when /output is reachable;
// the local entry above is already written, so a missing /output
// must not turn a good local run into a failure.
try {
  writeEntry("/output/entry.txt");
} catch (error) {
  console.error(
    "Could not write /output/entry.txt:",
    error instanceof Error ? error.message : error,
  );
}

console.log(`Wrote ${ROAST.length}-character roast to entry.txt`);
