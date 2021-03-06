import { Task, TaskUpdateInput } from './../graphql/generated/graphql';
export const Colors = {
	bgColor: { light: 'messenger.300', dark: 'messenger.800' },
	color: { light: 'black', dark: 'white' },
	board: { light: 'gray.400', dark: 'gray.600' },
	card: { light: 'gray.600', dark: 'gray.300' },
};

export const Routes = {
	home: '/',
	about: '/about',
	register: '/register',
	login: '/login',
	project: (id: number | string) => `/projects/${id}`,
	projects: '/projects',
	profile: '/profile',
	project_create: '/projects/create',
	user: (id: number | string) => `/users/${id}`,
	users: '/users',
};

export const isServer = () => typeof window === 'undefined';

const ip = 'http://94.237.124.184';
const port = 4000;
export const graphqlURL = `${ip}:${port}/graphql`;

export enum Queries {
	limit = 10,
	limitMin = 5,
	limitMax = 25,
}

export enum DragNDropStatus {
	Moved = 'moved',
	Reordered = 'reordered',
}

export const sentenceCaseString = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const splitCamelCase = (str: string) => {
	return str.replace(/([a-z])([A-Z])/g, '$1 $2');
};

export const initialColumns: ColumnState = {
	toDo: {
		name: 'To Do',
		tasks: Array<Task>(),
	},
	inProgress: {
		name: 'In Progress',
		tasks: Array<Task>(),
	},
	done: {
		name: 'Done',
		tasks: Array<Task>(),
	},
};

export interface DragNDropAction {
	type: DragNDropStatus;
	payload: ColumnState;
	event: { draggableId: string; input: TaskUpdateInput };
}

export interface Column {
	name: string;
	tasks: Task[];
}
export interface ColumnState {
	[key: string]: Column;
}
