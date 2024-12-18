type TransparentBoxProps = {
  children: React.ReactNode; // Permite conteúdo dinâmico dentro do quadrado
};

const TransparentBox = ({ children }: TransparentBoxProps) => {
  return (
    <div
      className="w-96 h-96 bg-white bg-opacity-10 
    backdrop-blur-md rounded-lg flex flex-col items-center justify-center gap-4 shadow-lg"
    >
      {children}
    </div>
  );
};

export default TransparentBox;
