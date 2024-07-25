export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-full items-center justify-center">
      {children}
    </section>
  );
}
