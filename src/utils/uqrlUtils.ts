import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import { simplePagination } from '@urql/exchange-graphcache/extras';
import { SSRExchange } from 'next-urql';
import { dedupExchange, fetchExchange } from 'urql';
import { CurrentUserDocument, CurrentUserQuery, LoginMutation } from '../graphql/generated/graphql';
import { graphqlURL } from './constants';

export function AuthCacheQuery<Result, Query>(
	cache: Cache,
	input: QueryInput,
	result: any,
	query: (result: Result, query: Query) => Query,
) {
	return cache.updateQuery(input, data => query(result, data as any) as any);
}

export const createUrqlClient = (ssr: SSRExchange) => ({
	url: graphqlURL,
	fetchOptions: { credentials: 'include' } as const,
	exchanges: [
		dedupExchange,
		cacheExchange({
			resolvers: {
				Query: {
					Posts: simplePagination(),
				},
			},
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
		ssr,
		fetchExchange,
	],
});
