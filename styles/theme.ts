import { extendTheme, ComponentStyleConfig } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const theme = extendTheme({
  fonts: {
    // heading: `'Open Sans', sans-serif`,
    body: `Flexa, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`,
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "#5C8B57",
      },
    },
  },
  components: {
    //styles for the modal component
    // Modal: {
    //   baseStyle: {
    //     bg: "#5C8B57",
        // color: "green",
    //   },
    // },
    //styles for the button component
    Button: {
      baseStyle: {
        bg: "blue",
        // color: "blue",
        // borderRadius: "5px",
        // fontSize: "1.2rem",
        // fontWeight: "bold",
        // padding: "0.5rem 1rem",
        "&:hover": {
          // bg: "blue",
          // color: "white",
        },
        
      },
    },
  },
});

export default theme;
