export const metadata = {
  title: "NexaStore — Premium Digital Assets",
  description: "Browse premium templates, UI kits and digital products at NexaStore.",
  openGraph: {
    title: "NexaStore",
    images: ["/og-image.png"]
  }
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
