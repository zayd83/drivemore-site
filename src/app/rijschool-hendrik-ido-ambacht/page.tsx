import { getCityMetadata } from "@/lib/config/cities";
import { CityPageContent } from "@/components/city/CityPageContent";

export const metadata = getCityMetadata("hendrik-ido-ambacht");

export default function Page() {
  return <CityPageContent slug="hendrik-ido-ambacht" />;
}
