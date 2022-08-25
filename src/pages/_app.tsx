import type { AppProps } from "next/app";

import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../styles/theme";

import "../styles/globals.css";
import Head from "next/head";
import { Toaster } from "react-hot-toast";
import { CrudContextProvider } from "../contexts/CrudContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CrudContextProvider>
      <ChakraProvider theme={theme}>
        <Head>
          <title>Crud</title>
        </Head>

        <Toaster position="top-center" reverseOrder={false} />

        <Component {...pageProps} />
      </ChakraProvider>
    </CrudContextProvider>
  );
}

export default MyApp;
