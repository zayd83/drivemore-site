import { getCityMetadata } from "@/lib/config/cities";
import { CityPageContent } from "@/components/city/CityPageContent";

export const metadata = getCityMetadata("alblasserdam");

export default function Page() {
  return <CityPageContent slug="alblasserdam" />;
}
