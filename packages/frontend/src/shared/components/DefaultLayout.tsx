export function DefaultLayout({children}: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background text-foreground">
        {children}
    </div>
  )
}