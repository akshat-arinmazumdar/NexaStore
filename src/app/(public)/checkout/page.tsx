import { auth } from "@/auth";
import { redirect } from "next/navigation";
import CheckoutClient from "@/components/checkout/CheckoutClient";

export default async function CheckoutPage() {
  const session = await auth();

  // FIX 2 — Session check at top
  if (!session || !session.user) {
    redirect("/login?callbackUrl=/checkout");
  }

  return <CheckoutClient session={session} />;
}
