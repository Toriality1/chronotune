interface GameBoxProps {
  children: React.ReactNode;
  color: string;
}

export default function GameBox({ children, color }: GameBoxProps) {
  return (
    <div
      className={`lg:m-4 flex bg-${color}-500  flex-col flex-grow relative overflow-hidden`}
    >
      {children}
    </div>
  );
}
