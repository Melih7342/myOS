import Navbar from "../SharedComponents/NavbarComponent.jsx";
import { Heroblock, TopOS_Forum } from "./HomepageComponents.jsx";
import Footer from "../SharedComponents/FooterComponent.jsx";

function Homepage() {
  {/*
          This is the Homepage component that includes the Navbar, Hero block, and Top OS & Forum block.

      Navbar: Is at the top of every single page.
      Hero block: The big block where we can start the actual Quiz.
      Top OS & Forum block: Shows the top operating systems and forum posts.
      
      */}
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      {/* pb-5 adds more padding at the bottom */}
      <main className="flex-grow-1 pb-5">
        <Heroblock />
        <TopOS_Forum />
      </main>
      <Footer />
    </div>
  );
}

export default Homepage;
