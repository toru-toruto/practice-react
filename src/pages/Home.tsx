import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <Link to={"/wagmi"}>wagmi practice</Link>
      <Link to={"/lit"}>Lit-Protocol practice</Link>
    </>
  );
};

export default Home;
