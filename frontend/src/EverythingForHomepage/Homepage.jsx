import Navbar from "../SharedComponents/NavbarComponent.jsx";
import { Heroblock, TopOS_Forum } from "./HomepageComponents.jsx";

function Homepage() {
  return (
    <>
      {/*
      This is the Homepage component that includes the Navbar, Hero block, and Top OS & Forum block.

      Navbar: Is at the top of every single page.
      Hero block: The big block where we can start the actual Quiz.
      Top OS & Forum block: Shows the top operating systems and forum posts.
      
      */}
      <Navbar />

      <Heroblock />

      <TopOS_Forum />
    </>
  );
}

export default Homepage;
