import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="h-full w-full flex flex-col items-center">
      <Header />
      {children}
      {/* <Footer /> */}
    </main>
  );
}
