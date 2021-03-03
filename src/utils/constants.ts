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
