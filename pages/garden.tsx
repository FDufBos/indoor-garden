import React from "react";
import Homepage from "../components/fullPages/homepage";
import GetStarted from "../components/fullPages/getStarted";
import { getAuth } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";
import {useUserAuth} from "../contexts/AuthContext";


export default function Garden() {

  const { user } = useUserAuth();


  return (<div>

    {user ? (<Homepage />):(<GetStarted></GetStarted>) }
  </div>);
}
