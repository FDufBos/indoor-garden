/* eslint-disable max-len */
import { Global } from "@emotion/react";
import React from "react";

const Fonts: React.FC = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Alpina';
        font-style: normal;
        font-weight: 700;
        font-display: swap;
        src: url('./assets/fonts/GT-Alpina-Standard-Bold.woff2') format('woff2'),
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      /* latin */
      @font-face {
        font-family: 'Flexa';
        font-style: normal;
        font-weight: 50 950;
        font-stretch: 75% 125%;
        format("woff2-variations");
        font-display: swap;
        src: url('./assets/fonts/GT-Flexa-GX.woff2') format('woff2'),
        unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
      }
      `}
  />
);

export default Fonts;
/* eslint-enable max-len */
