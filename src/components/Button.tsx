type ButtonProps = {
  onClick: () => void;
  label: string;
};

const Button = ({ onClick, label }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-3 mt-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-200"
    >
      {label}
    </button>
  );
};

export default Button;
