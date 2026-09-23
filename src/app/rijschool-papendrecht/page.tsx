import { getCityMetadata } from "@/lib/config/cities";
import { CityPageContent } from "@/components/city/CityPageContent";

export const metadata = getCityMetadata("papendrecht");

export default function Page() {
  return <CityPageContent slug="papendrecht" />;
}
