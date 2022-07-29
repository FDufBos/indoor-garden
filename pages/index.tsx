import React, { useEffect } from "react";
import Router from "next/router";

import GetStarted from "../components/fullPages/getStarted";
import { useUserAuth } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useUserAuth();
  useEffect(() => {
    if (user) {
      Router.push("/garden");
    }
  }, [user]);
  return (
  <GetStarted />);
}
