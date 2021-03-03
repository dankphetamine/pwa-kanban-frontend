import { ChakraProvider } from '@chakra-ui/react';
import { cacheExchange } from '@urql/exchange-graphcache';
import { AppProps } from 'next/app';
import { createClient, dedupExchange, fetchExchange, Provider } from 'urql';
import NavBar from '../components/NavigationBar';
import { GetCurrentUserDocument, GetCurrentUserQuery, LoginMutation } from '../graphql/generated/graphql';
import theme from '../theme';
import { gqlUrl, LoginCacheQuery as AuthCacheQuery } from '../utils/constants';

const client = createClient({
	url: gqlUrl,
	fetchOptions: {
		credentials: 'include',
	},
	exchanges: [
		cacheExchange({
			updates: {
				Mutation: {
					login: (result, _args, cache, _info) => {
						AuthCacheQuery<LoginMutation, GetCurrentUserQuery>(
							cache,
							{ query: GetCurrentUserDocument },
							result,
							(res, query) => {
								if (!res.login.email) return query;
								else return { getCurrentUser: res.login };
							},
						);
					},
				},
			},
		}),
		dedupExchange,
		fetchExchange,
	],
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
