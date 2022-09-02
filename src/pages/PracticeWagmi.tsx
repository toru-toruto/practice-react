import React from "react";
import { Link } from "react-router-dom";
import { Chain, Client, InjectedConnector } from "@wagmi/core";
import { ContractInterface } from "ethers";
import {
  useAccount,
  useConnect,
  useContractRead,
  useContractReads,
  useContractWrite,
  useDisconnect,
  usePrepareContractWrite,
  useSignMessage,
} from "wagmi";
import GensoKishiOnline from "../data/GensoKishiOnlineABI.json";
// import VoteItPlz from "../data/VoteItPlz.json";
const VoteItPlz: any = require("../data/VoteItPlz.json");

const voteItPlzContract = {
  addressOrName: "0xC4391186b5d67F8ee68D3Daf16f4BF026bAd6bE6",
  contractInterface: VoteItPlz.abi,
};

const gensoKishiContract = {
  addressOrName: "0xC7a096b4c6610ba3a836070333ff7922b9866a36",
  contractInterface: GensoKishiOnline,
};

const PracticeWagmi: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return (
    <>
      <div>
        {isConnected ? (
          <>
            <p>Connected to {address}</p>
            <button onClick={() => disconnect()}>disconnect</button>
            <Sub />
          </>
        ) : (
          <>
            <button onClick={() => connect()}>Connect Wallet</button>
          </>
        )}
      </div>
      <Link to={"/wagmi"}>wagmi practice</Link>
      <Link to={"/lit"}>Lit-Protocol practice</Link>
    </>
  );
};

const Sub: React.FC = () => {
  const { address, isConnected } = useAccount();

  const voteOne = usePrepareContractWrite({
    ...voteItPlzContract,
    functionName: "voteOne",
    args: [1],
  });
  const voteOneWrite = useContractWrite({
    ...voteOne.config,
    onSuccess(data) {
      console.log(data);
    },
  });

  const signMessage = useSignMessage({
    message: "はろーわーるど",
    onSuccess(data) {
      console.log(data);
    },
  });

  const { refetch } = useContractReads({
    contracts: [
      {
        ...gensoKishiContract,
        functionName: "ownerOf",
        args: [10000000038955],
      },
      {
        ...voteItPlzContract,
        functionName: "getVotesByOwner",
        args: [address],
      },
      {
        ...voteItPlzContract,
        functionName: "getOwnVotes",
      },
      {
        ...voteItPlzContract,
        functionName: "getOwnFirstVote",
      },
      {
        ...voteItPlzContract,
        functionName: "getVotes",
      },
      {
        ...voteItPlzContract,
        functionName: "getVoteValues",
      },
    ],
  });

  // if (!isError) {
  //   console.log(data);
  // } else {
  //   console.log("error");
  // }

  const handleRead = async () => {
    refetch()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {/* <button
        onClick={() => voteOneWrite.write?.()}
      >
        Vote One
      </button> */}
      {voteOneWrite.isLoading && <div>Check Wallet</div>}

      <button
        disabled={signMessage.isLoading}
        onClick={() => signMessage.signMessage()}
      >
        Sign message
      </button>

      {/* {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}
      <button onClick={handleRead}>Read Own Votes</button>
    </>
  );
};

export default PracticeWagmi;
