import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../styles/theme";
import Fonts from "../styles/Fonts";
import { UserAuthContextProvider } from "../contexts/AuthContext";

function MyApp({ Component, pageProps }) {
  return (
    <UserAuthContextProvider>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </UserAuthContextProvider>
  );
}

export default MyApp;
