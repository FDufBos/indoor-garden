import Router, { useRouter } from "next/router";
import { useUserAuth } from "../contexts/AuthContext";

import ProfilePage from "../components/fullPages/profilePage";

export default function User() {
  //create state to store plant query param
  const router = useRouter();
  // const {userProfile} = router.query;
  const { user, userDocument } = useUserAuth();



  return (
    <div>
      <ProfilePage name={userDocument.name} ></ProfilePage>
    </div>
  );
}