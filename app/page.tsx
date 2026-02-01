import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

export default function Home() {
  // Admin routes are handled separately, don't redirect them
  redirect(`/${defaultLocale}`);
}
