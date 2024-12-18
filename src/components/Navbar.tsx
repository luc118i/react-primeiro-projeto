const Navbar = () => {
  return (
    <nav className="w-full bg-gray-800 text-white py-4 px-6 fixed top-0 left-0 z-10">
      <ul className="flex items-center justify-start space-x-6">
        <li className="hover:text-gray-400 cursor-pointer">Início</li>
        <li className="hover:text-gray-400 cursor-pointer">Jogos ao Vivo</li>
        <li className="hover:text-gray-400 cursor-pointer">Estatísticas</li>
      </ul>
    </nav>
  );
};

export default Navbar;
