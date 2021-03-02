import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { createClient, Provider } from 'urql';
import theme from '../theme';
import { gqlUrl } from '../utils/constants';

const client = createClient({ url: gqlUrl });

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider value={client}>
			<ChakraProvider resetCSS theme={theme}>
				<Component {...pageProps} />
			</ChakraProvider>
		</Provider>
	);
}

export default MyApp;
