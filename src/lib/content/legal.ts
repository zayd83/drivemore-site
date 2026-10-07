import fs from "fs";
import path from "path";

export interface LegalDoc {
  markdown: string;
  lastUpdated: Date | null;
  found: boolean;
}

// Geen fabricated juridische tekst — als het bestand nog niet is aangeleverd in content/legal/
// tonen we een nette "volgt nog"-placeholder i.p.v. een 404/crash. Zodra het bestand er staat,
// verschijnt de echte inhoud vanzelf, zonder codewijziging.
export function readLegalDoc(filename: string): LegalDoc {
  const filePath = path.join(process.cwd(), "content", "legal", filename);
  try {
    const markdown = fs.readFileSync(filePath, "utf-8");
    const { mtime } = fs.statSync(filePath);
    return { markdown, lastUpdated: mtime, found: true };
  } catch {
    return { markdown: "", lastUpdated: null, found: false };
  }
}
