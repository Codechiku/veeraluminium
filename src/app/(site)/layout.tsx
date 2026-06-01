import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { ServiceWorkerRegister } from "@/components/pwa-register";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <FloatingActions />
      <ServiceWorkerRegister />
    </>
  );
}
