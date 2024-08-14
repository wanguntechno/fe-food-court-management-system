import Header from './_components/Header';

const layout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="flex h-screen w-full">
      <Header />
      <div className="mx-auto h-full w-full max-w-[1400px] gap-8 p-6 pt-24">{children}</div>
    </div>
  );
};

export default layout;
