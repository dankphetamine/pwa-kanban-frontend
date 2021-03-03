import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { createClient, Provider } from 'urql';
import NavBar from '../components/NavigationBar';
import theme from '../theme';
import { gqlUrl } from '../utils/constants';

const client = createClient({
	url: gqlUrl,
	fetchOptions: {
		credentials: 'include',
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider value={client}>
			<ChakraProvider resetCSS theme={theme}>
				<NavBar />
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	);
}

export default MyApp;
