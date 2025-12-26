import { Navbar } from "@/components/navbar";
import { SiteFooter } from "@/components/site-footer";

export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
