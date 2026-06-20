"use client";

import dynamic from "next/dynamic";

const FloatingCard = dynamic(
  () => import("./FloatingCard").then((m) => m.FloatingCard),
  { ssr: false }
);

export function FloatingCardClient() {
  return <FloatingCard />;
}
