import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import React from 'react';
import NavBar from '../components/NavigationBar';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<React.StrictMode>
			<ChakraProvider resetCSS theme={theme}>
				<NavBar {...pageProps} />
				<Component {...pageProps} />
			</ChakraProvider>
		</React.StrictMode>
	);
}

export default MyApp;
