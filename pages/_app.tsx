import "../styles/globals.css";

import { ChakraProvider } from "@chakra-ui/react";
import AuthWrapper from "@main/components/AuthWrapper";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import { QueryClient, QueryClientProvider } from "react-query";

import { UserAuthContextProvider } from "../contexts/AuthContext";
import theme from "../styles/theme";

// Create a query client for React Query
const queryClient = new QueryClient();

// Pages that don't require auth
const publicPages = ["/"]; // or more if you want

export const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  const isPublicPage = publicPages.includes(router.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <UserAuthContextProvider>
        <ChakraProvider theme={theme}>
          <AnimatePresence exitBeforeEnter initial={false}>
            {/* <MotionConfig reducedMotion="never"> */}
            <MotionConfig>
              {isPublicPage ? (
                <Component {...pageProps} />
              ) : (
                <AuthWrapper>
                  <Component {...pageProps} key={router.pathname} />
                </AuthWrapper>
              )}
            </MotionConfig>
          </AnimatePresence>
        </ChakraProvider>
      </UserAuthContextProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
