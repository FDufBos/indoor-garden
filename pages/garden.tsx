import React from "react";

import GetStarted from "../components/fullPages/getStarted";
import Homepage from "../components/fullPages/homepage";
import { useUserAuth } from "../contexts/AuthContext";

export const Garden: React.FC = () => {
  const { user } = useUserAuth();

  return <div>{user ? <Homepage /> : <GetStarted />}</div>;
};
export default Garden;
