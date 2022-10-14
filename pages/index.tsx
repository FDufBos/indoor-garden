import Router from "next/router";
import React, { useEffect } from "react";

import GetStarted from "../components/fullPages/getStarted";
import { useUserAuth } from "../contexts/AuthContext";

export const Home: React.FC = () => {
  const { user } = useUserAuth();
  useEffect(() => {
    if (user) {
      Router.push("/garden");
    }
  }, [user]);
  return <GetStarted />;
};
export default Home;
