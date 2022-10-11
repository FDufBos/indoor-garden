import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import Fonts from "../styles/Fonts";
import { UserAuthContextProvider } from "../contexts/AuthContext";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
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
}

export default MyApp;
