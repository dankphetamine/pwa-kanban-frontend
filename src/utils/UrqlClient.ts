import { cacheExchange } from '@urql/exchange-graphcache';
import { dedupExchange, fetchExchange } from 'urql';
import { CurrentUserDocument, CurrentUserQuery, LoginMutation } from './../graphql/generated/graphql';
import { AuthCacheQuery, gqlUrl } from './constants';

export const urqlClient = ssrExchange => ({
	url: gqlUrl,
	fetchOptions: {
		credentials: 'include',
	} as const,
	exchanges: [
		dedupExchange,
		cacheExchange({
			updates: {
				Mutation: {
					login: (result, _args, cache, _info) => {
						AuthCacheQuery<LoginMutation, CurrentUserQuery>(
							cache,
							{ query: CurrentUserDocument },
							result,
							(res, query) => {
								if (!res.login.email) return query;
								else return { currentUser: res.login };
							},
						);
					},

					logout: (result, _args, cache, _info) => {
						AuthCacheQuery<LoginMutation, CurrentUserQuery>(
							cache,
							{ query: CurrentUserDocument },
							result,
							(_res, _query) => {
								return { currentUser: null };
							},
						);
					},
				},
			},
		}),
		ssrExchange,
		fetchExchange,
	],
});
