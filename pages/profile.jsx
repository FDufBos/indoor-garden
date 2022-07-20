import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUserAuth } from "../contexts/AuthContext";
// import { db } from "../../utils/firebaseUtils";

import ProfilePage from "../components/profilePage";

export default function User() {
  //create state to store plant query param
  const router = useRouter();
  // const {userProfile} = router.query;
  const { user, userDocument } = useUserAuth();

  console.log(userDocument)
  console.log(user)
  

  return (
    <div>
      <ProfilePage name={userDocument.name} email={user.email} avatar={undefined} ></ProfilePage>
    </div>
  );
}