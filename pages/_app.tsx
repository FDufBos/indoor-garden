import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

import { UserAuthContextProvider } from "../contexts/AuthContext";
import Fonts from "../styles/Fonts";
import theme from "../styles/theme";

export const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <UserAuthContextProvider>
      <ChakraProvider theme={theme}>
        <Fonts />

        <AnimatePresence exitBeforeEnter initial={false}>
          {/* <MotionConfig reducedMotion="never"> */}
          <MotionConfig>
            <Component {...pageProps} key={router.pathname} />
          </MotionConfig>
        </AnimatePresence>
      </ChakraProvider>
    </UserAuthContextProvider>
  );
};

export default MyApp;
