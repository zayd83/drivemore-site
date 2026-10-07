import fs from "fs";
import path from "path";

export interface LegalDoc {
  markdown: string;
  found: boolean;
}

// Geen fabricated juridische tekst — als het bestand nog niet is aangeleverd in content/legal/
// tonen we een nette "volgt nog"-placeholder i.p.v. een 404/crash. Zodra het bestand er staat,
// verschijnt de echte inhoud vanzelf, zonder codewijziging. De "Laatst bijgewerkt"-datum staat
// bewust in de documenten zelf (eerste regel) i.p.v. hier afgeleid te worden uit de bestandsdatum.
export function readLegalDoc(filename: string): LegalDoc {
  const filePath = path.join(process.cwd(), "content", "legal", filename);
  try {
    const markdown = fs.readFileSync(filePath, "utf-8");
    return { markdown, found: true };
  } catch {
    return { markdown: "", found: false };
  }
}
