import NAVBAR from "./components/Navbar.jsx";
import HERO from "./components/Heroblock.jsx";
import TopOS from "./components/TopOS+ForumBlock.jsx";

function Homepage() {
  return (
    <div>
      <NAVBAR />

      <HERO />

      <TopOS />
    </div>
  );
}

export default Homepage;