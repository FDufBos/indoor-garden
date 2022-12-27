import { useUserAuth } from "@main/contexts/AuthContext";
import { PropsWithChildren } from "react";

import GetStarted from "./fullPages/getStarted";

const AuthWrapper = ({
  children,
}: PropsWithChildren<Record<string, unknown>>): React.ReactElement => {
  const { user } = useUserAuth();

  if (user === undefined) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <GetStarted />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
