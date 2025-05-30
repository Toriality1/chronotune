export default function GameLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-middle text-center h-screen lg:w-1/2 lg:m-auto bg-black">
      {children}
    </div>
  );
}
