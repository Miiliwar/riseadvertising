import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { BackgroundTexture } from "./BackgroundTexture";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      <BackgroundTexture />
      <Header />
      <main className="flex-1 pt-14 md:pt-[100px] relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
}
