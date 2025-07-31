import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Studio Sobra",
    description: "Landscape and Floral Design Studio based in Copenhagen",
  };
}