import { Cache, QueryInput } from '@urql/exchange-graphcache';

export const Colors = {
	bgColor: { light: 'messenger.300', dark: 'messenger.800' },
	color: { light: 'black', dark: 'white' },
};

export const Routes = {
	home: '/',
	// login: '/login', Handled by Next-Auth
	register: '/register',
	login: '/login',
	project: (id: number | string) => `/projects/${id}`,
	projects: '/projects',
	profile: '/profile',
	user: (id: number | string) => `/users/${id}`,
	users: '/users',
};

const port = 4000;
export const gqlUrl = `http://localhost:${port}/graphql`;

export function LoginCacheQuery<Result, Query>(
	cache: Cache,
	input: QueryInput,
	result: any,
	query: (result: Result, query: Query) => Query,
) {
	return cache.updateQuery(input, data => query(result, data as any) as any);
}
