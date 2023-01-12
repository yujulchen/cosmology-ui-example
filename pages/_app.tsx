import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { defaultTheme, ThemeProvider } from '@cosmology-ui/react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <ChakraProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ThemeProvider>
  );
}
