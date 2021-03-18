export const Colors = {
	bgColor: { light: 'messenger.300', dark: 'messenger.800' },
	color: { light: 'black', dark: 'white' },
	board: { light: 'gray.400', dark: 'gray.600' },
	card: { light: 'gray.600', dark: 'gray.300' },
};

export const Routes = {
	home: '/',
	register: '/register',
	login: '/login',
	project: (id: number | string) => `/projects/${id}`,
	projects: '/projects',
	profile: '/profile',
	project_add: '/add-project',
	user: (id: number | string) => `/users/${id}`,
	users: '/users',
};

export const isServer = () => typeof window === 'undefined';

const port = 4000;
export const graphqlURL = `http://localhost:${port}/graphql`;

export enum Queries {
	limit = 10,
	limitMin = 5,
	limitMax = 25,
}

export function capitalizeString(str: string) {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function sentenceCase(str: string) {
	if (!str) return undefined;
	return str.replace(/([!?.:]\s+)([a-z])/g, match => match.toUpperCase());
}

// /(?:^|\s|[-"'([{])+\S/g

export const columnArray = ['todo', 'in progress', 'done'];
