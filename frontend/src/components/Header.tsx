import logo from "@/assets/logo.webp";

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const Header = ({ searchTerm, setSearchTerm }: HeaderProps) => (
  <header className="bg-gray-700/40 py-4 mb-4 w-full">
    <div className="max-w-7xl w-full mx-auto">
      <img src={logo} alt="Logo" className="h-12 mx-auto" />
      <div className="flex justify-center mt-4">
        <input
          id="pokemon-search"
          type="text"
          placeholder="Chercher un Pokémon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 mx-4 rounded-lg border border-gray-300 placeholder:text-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full max-w-md"
        />
      </div>
    </div>
  </header>
);

export default Header;
