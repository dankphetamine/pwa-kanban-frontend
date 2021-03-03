import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import NavBar from '../components/NavigationBar';
import theme from '../theme';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<NavBar pageProps={null} />
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
