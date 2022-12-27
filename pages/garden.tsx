import {Spinner} from "@chakra-ui/react";
import GetStarted from "@main/components/fullPages/getStarted";
import Homepage from "@main/components/fullPages/homepage";
import { useUserAuth } from "@main/contexts/AuthContext";
import React from "react";

export const Garden: React.FC = () => {
  const { user } = useUserAuth();

  if (user === undefined) {
    return <Spinner />;
  }

  return <div>{user ? <Homepage /> : <GetStarted />}</div>;

};
export default Garden;
