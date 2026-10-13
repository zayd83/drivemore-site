// Rendert één of meer JSON-LD-blokken. `<` wordt ge-escaped zodat tekst in de data nooit
// de <script>-tag kan afsluiten.
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
