import { Header } from "@/components/header";

export default function FormLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex flex-col items-center">
      <Header />
      {children}
      {/* <Footer /> */}
    </main>
  );
}
