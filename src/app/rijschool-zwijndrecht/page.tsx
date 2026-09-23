import { getCityMetadata } from "@/lib/config/cities";
import { CityPageContent } from "@/components/city/CityPageContent";

export const metadata = getCityMetadata("zwijndrecht");

export default function Page() {
  return <CityPageContent slug="zwijndrecht" />;
}
