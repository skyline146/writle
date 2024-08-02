export default function MeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className='lg:w-[950px] lg:pl-[50px] xl:w-[1000px] xl:pl-[100px] 2xl:w-[1200px] 2xl:pl-[300px]'>
      {children}
    </section>
  );
}
