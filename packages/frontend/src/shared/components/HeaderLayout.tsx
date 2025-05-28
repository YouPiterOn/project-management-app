import { Header } from "./Header";

export function HeaderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 px-4 py-12 flex justify-center">
        {children}
      </main>
    </div>
  );
}