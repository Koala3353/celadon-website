import type { Metadata } from "next";
import { NerdInLove } from "@/components/internal/nerd-in-love";

export const metadata: Metadata = {
  title: "Nerd in Love — OSR Recruitment",
  robots: { index: false, follow: false },
};

export default function NerdInLovePage() {
  return <NerdInLove />;
}
