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

export const isServer = () => typeof window === 'undefined';

const port = 4000;
export const graphqlURL = `http://localhost:${port}/graphql`;

export enum Queries {
	limit = 10,
	limitMax = 25,
}
