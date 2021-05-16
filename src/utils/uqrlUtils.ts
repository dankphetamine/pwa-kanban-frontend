import { Cache, cacheExchange, QueryInput } from '@urql/exchange-graphcache';
import { SSRExchange } from 'next-urql';
import { dedupExchange, fetchExchange } from 'urql';
import {
	CurrentUserDocument,
	CurrentUserQuery,
	DeleteProjectMutationVariables,
	DeleteTaskMutationVariables,
	LoginMutation,
} from '../graphql/generated/graphql';
import { UpdateTaskMutationVariables } from './../graphql/generated/graphql';
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
					// Posts: simplePagination(),
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

					createProject: (_result, _args, cache, _info) => {
						const allFields = cache.inspectFields('Query');
						console.log(allFields);

						const fieldInfo = allFields.filter(i => i.fieldName === 'projects');
						fieldInfo.forEach(i => {
							cache.invalidate('Query', 'projects', i.arguments || {});
						});
					},

					deleteProject: (_result, args, cache, _info) => {
						cache.invalidate({ __typename: 'Project', id: (args as DeleteProjectMutationVariables).id });
					},

					deleteTask: (_result, args, cache, _info) => {
						cache.invalidate({ __typename: 'Task', id: (args as DeleteTaskMutationVariables).id });
					},

					updateTask: (_result, args, cache, _info) => {
						cache.invalidate({ __typename: 'Task', id: (args as UpdateTaskMutationVariables).id });
					},
				},
			},
		}),
		ssr,
		fetchExchange,
	],
});
