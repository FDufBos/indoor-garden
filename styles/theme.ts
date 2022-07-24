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
    //styles for the button component
    Tooltip: {
      baseStyle: {
        bg: "#FCFEF8",
        borderRadius: "999px",
        color: "#3F5214",
      },
    },
    Button: {
      baseStyle: {
        bg: "blue",
        "&:hover": {
          // bg: "blue",
          // color: "white",
        },
      },
    },
  },
});


export default theme;
