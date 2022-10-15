import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

import { UserAuthContextProvider } from "../contexts/AuthContext";
import Fonts from "../styles/Fonts";
import theme from "../styles/theme";

// Create a query client for React Query
const queryClient = new QueryClient();

export const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
};

export default MyApp;
