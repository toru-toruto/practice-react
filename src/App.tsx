import "./App.css";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import PracticeWagmi from "./components/PracticeWagmi";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import React from "react";
import PracticeLit from "./components/PracticeLit";
import Home from "./components/Home";

const { chains, provider, webSocketProvider } = configureChains(
  [chain.mainnet, chain.polygon, chain.polygonMumbai],
  [infuraProvider({ apiKey: "aa619128363840b9a1665c5f8c70c472" })]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const App: React.FC = () => {
  console.log("hoge!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  return (
    <WagmiConfig client={client}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/wagmi"} element={<PracticeWagmi />} />
          <Route path={"/lit-protocol"} element={<PracticeLit />} />
        </Routes>
      </BrowserRouter>
    </WagmiConfig>
  );
};

export default App;
