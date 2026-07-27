import Navbar from "./Navbar";
import TopBar from "./TopBar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <TopBar />
      <Navbar />
    </header>
  );
};

export default Header;