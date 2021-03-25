import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
	DateTime: any;
};

export type Query = {
	__typename?: 'Query';
	comment?: Maybe<Comment>;
	comments?: Maybe<Array<Comment>>;
	project?: Maybe<Project>;
	projects?: Maybe<Array<Project>>;
	task?: Maybe<Task>;
	tasks?: Maybe<Array<Task>>;
	user?: Maybe<User>;
	users?: Maybe<Array<User>>;
	currentUser?: Maybe<User>;
};

export type QueryCommentArgs = {
	id: Scalars['Int'];
};

export type QueryProjectArgs = {
	id: Scalars['Int'];
};

export type QueryProjectsArgs = {
	filter?: Maybe<FilterInput>;
};

export type QueryTaskArgs = {
	id: Scalars['Int'];
};

export type QueryTasksArgs = {
	filter?: Maybe<TaskFilterInput>;
};

export type QueryUserArgs = {
	email: Scalars['String'];
};

export type QueryUsersArgs = {
	filter?: Maybe<FilterInput>;
};

export type Comment = {
	__typename?: 'Comment';
	id: Scalars['Int'];
	task: Task;
	author: User;
	text: Scalars['String'];
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
};

export type Task = {
	__typename?: 'Task';
	id: Scalars['ID'];
	project: Project;
	reporter: User;
	asignee?: Maybe<User>;
	title: Scalars['String'];
	description?: Maybe<Scalars['String']>;
	status?: Maybe<Scalars['String']>;
	comments?: Maybe<Array<Comment>>;
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
};

export type Project = {
	__typename?: 'Project';
	id: Scalars['Int'];
	name: Scalars['String'];
	description?: Maybe<Scalars['String']>;
	owner: User;
	collaborators?: Maybe<Array<User>>;
	tasks?: Maybe<Array<Task>>;
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
};

export type User = {
	__typename?: 'User';
	id: Scalars['ID'];
	email?: Maybe<Scalars['String']>;
	name?: Maybe<Scalars['String']>;
	image?: Maybe<Scalars['String']>;
	tasks?: Maybe<Array<Task>>;
	comments?: Maybe<Array<Comment>>;
	projects?: Maybe<Array<Project>>;
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
};

export type FilterInput = {
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
};

export type TaskFilterInput = {
	limit?: Maybe<Scalars['Int']>;
	offset?: Maybe<Scalars['Int']>;
	projectId?: Maybe<Scalars['Int']>;
};

export type Mutation = {
	__typename?: 'Mutation';
	createComment?: Maybe<Comment>;
	createProject?: Maybe<Project>;
	updateProjectText?: Maybe<Project>;
	deleteProject?: Maybe<Project>;
	createTask?: Maybe<Task>;
	updateTask?: Maybe<Task>;
	deleteTask?: Maybe<Array<Task>>;
	register: User;
	login: User;
	updateUserName?: Maybe<User>;
	logout: Scalars['Boolean'];
};

export type MutationCreateCommentArgs = {
	taskId: Scalars['Int'];
	text: Scalars['String'];
};

export type MutationCreateProjectArgs = {
	description: Scalars['String'];
	name: Scalars['String'];
};

export type MutationUpdateProjectTextArgs = {
	input?: Maybe<ProjectUpdateInput>;
	id: Scalars['Int'];
};

export type MutationDeleteProjectArgs = {
	id: Scalars['Int'];
};

export type MutationCreateTaskArgs = {
	description: Scalars['String'];
	title: Scalars['String'];
	projectId: Scalars['Int'];
};

export type MutationUpdateTaskArgs = {
	input?: Maybe<TaskUpdateInput>;
	id: Scalars['Int'];
};

export type MutationDeleteTaskArgs = {
	id: Scalars['Int'];
};

export type MutationRegisterArgs = {
	input: AuthInput;
};

export type MutationLoginArgs = {
	input: AuthInput;
};

export type MutationUpdateUserNameArgs = {
	name: Scalars['String'];
	email: Scalars['String'];
};

export type ProjectUpdateInput = {
	name?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
};

export type TaskUpdateInput = {
	title?: Maybe<Scalars['String']>;
	description?: Maybe<Scalars['String']>;
	asigneeId?: Maybe<Scalars['Float']>;
	status?: Maybe<Scalars['String']>;
};

export type AuthInput = {
	email: Scalars['String'];
	password: Scalars['String'];
};

export type BaseProjectFragment = { __typename?: 'Project' } & Pick<
	Project,
	'id' | 'name' | 'description' | 'createdAt' | 'updatedAt'
>;

export type BaseTaskFragment = { __typename?: 'Task' } & Pick<
	Task,
	'id' | 'title' | 'status' | 'createdAt' | 'updatedAt'
>;

export type BaseUserFragment = { __typename?: 'User' } & Pick<
	User,
	'id' | 'email' | 'name' | 'createdAt' | 'updatedAt'
>;

export type LoginMutationVariables = Exact<{
	email: Scalars['String'];
	password: Scalars['String'];
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
	login: { __typename?: 'User' } & Pick<User, 'name'> & BaseUserFragment;
};

export type LogOutMutationVariables = Exact<{ [key: string]: never }>;

export type LogOutMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'logout'>;

export type RegisterMutationVariables = Exact<{
	email: Scalars['String'];
	password: Scalars['String'];
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & { register: { __typename?: 'User' } & BaseUserFragment };

export type CreateProjectMutationVariables = Exact<{
	name: Scalars['String'];
	description: Scalars['String'];
}>;

export type CreateProjectMutation = { __typename?: 'Mutation' } & {
	createProject?: Maybe<{ __typename?: 'Project' } & BaseProjectFragment>;
};

export type DeleteProjectMutationVariables = Exact<{
	id: Scalars['Int'];
}>;

export type DeleteProjectMutation = { __typename?: 'Mutation' } & {
	deleteProject?: Maybe<{ __typename?: 'Project' } & BaseProjectFragment>;
};

export type CreateTaskMutationVariables = Exact<{
	projectId: Scalars['Int'];
	title: Scalars['String'];
	description: Scalars['String'];
}>;

export type CreateTaskMutation = { __typename?: 'Mutation' } & {
	createTask?: Maybe<
		{ __typename?: 'Task' } & {
			project: { __typename?: 'Project' } & Pick<Project, 'id' | 'name'>;
			reporter: { __typename?: 'User' } & Pick<User, 'id'>;
		} & BaseTaskFragment
	>;
};

export type UpdateTaskMutationVariables = Exact<{
	id: Scalars['Int'];
	input?: Maybe<TaskUpdateInput>;
}>;

export type UpdateTaskMutation = { __typename?: 'Mutation' } & {
	updateTask?: Maybe<{ __typename?: 'Task' } & Pick<Task, 'title' | 'description' | 'status'>>;
};

export type DeleteTaskMutationVariables = Exact<{
	id: Scalars['Int'];
}>;

export type DeleteTaskMutation = { __typename?: 'Mutation' } & {
	deleteTask?: Maybe<Array<{ __typename?: 'Task' } & BaseTaskFragment>>;
};

export type UpdateUserNameMutationVariables = Exact<{
	email: Scalars['String'];
	name: Scalars['String'];
}>;

export type UpdateUserNameMutation = { __typename?: 'Mutation' } & {
	updateUserName?: Maybe<{ __typename?: 'User' } & BaseUserFragment>;
};

export type ProjectQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type ProjectQuery = { __typename?: 'Query' } & {
	project?: Maybe<
		{ __typename?: 'Project' } & {
			collaborators?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>>;
			tasks?: Maybe<
				Array<
					{ __typename?: 'Task' } & Pick<Task, 'id' | 'title' | 'description' | 'status'> & {
							reporter: { __typename?: 'User' } & Pick<User, 'image'> & BaseUserFragment;
							asignee?: Maybe<{ __typename?: 'User' } & Pick<User, 'image'> & BaseUserFragment>;
						}
				>
			>;
		} & BaseProjectFragment
	>;
};

export type ProjectsQueryVariables = Exact<{
	filter?: Maybe<FilterInput>;
}>;

export type ProjectsQuery = { __typename?: 'Query' } & {
	projects?: Maybe<
		Array<
			{ __typename?: 'Project' } & {
				collaborators?: Maybe<Array<{ __typename?: 'User' } & Pick<User, 'id' | 'name'>>>;
				owner: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'image'>;
				tasks?: Maybe<Array<{ __typename?: 'Task' } & Pick<Task, 'id' | 'title'>>>;
			} & BaseProjectFragment
		>
	>;
};

export type TaskQueryVariables = Exact<{
	id: Scalars['Int'];
}>;

export type TaskQuery = { __typename?: 'Query' } & {
	task?: Maybe<
		{ __typename?: 'Task' } & {
			project: { __typename?: 'Project' } & Pick<Project, 'id' | 'name'>;
			reporter: { __typename?: 'User' } & Pick<User, 'id' | 'name' | 'image'>;
			asignee?: Maybe<{ __typename?: 'User' } & Pick<User, 'id' | 'name' | 'image'>>;
			comments?: Maybe<
				Array<
					{ __typename?: 'Comment' } & Pick<Comment, 'id' | 'text'> & {
							task: { __typename?: 'Task' } & Pick<Task, 'id'>;
						}
				>
			>;
		} & BaseTaskFragment
	>;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: 'Query' } & {
	currentUser?: Maybe<
		{ __typename?: 'User' } & Pick<User, 'image'> & {
				projects?: Maybe<Array<{ __typename?: 'Project' } & Pick<Project, 'id' | 'name'>>>;
			} & BaseUserFragment
	>;
};

export type UserByEmailQueryVariables = Exact<{
	email: Scalars['String'];
}>;

export type UserByEmailQuery = { __typename?: 'Query' } & {
	user?: Maybe<
		{ __typename?: 'User' } & {
			projects?: Maybe<Array<{ __typename?: 'Project' } & Pick<Project, 'id' | 'name'>>>;
		} & BaseUserFragment
	>;
};

export type UsersQueryVariables = Exact<{
	filter?: Maybe<FilterInput>;
}>;

export type UsersQuery = { __typename?: 'Query' } & {
	users?: Maybe<
		Array<
			{ __typename?: 'User' } & {
				projects?: Maybe<Array<{ __typename?: 'Project' } & Pick<Project, 'id' | 'name'>>>;
			} & BaseUserFragment
		>
	>;
};

export const BaseProjectFragmentDoc = gql`
	fragment BaseProject on Project {
		id
		name
		description
		createdAt
		updatedAt
	}
`;
export const BaseTaskFragmentDoc = gql`
	fragment BaseTask on Task {
		id
		title
		status
		createdAt
		updatedAt
	}
`;
export const BaseUserFragmentDoc = gql`
	fragment BaseUser on User {
		id
		email
		name
		createdAt
		updatedAt
	}
`;
export const LoginDocument = gql`
	mutation Login($email: String!, $password: String!) {
		login(input: { email: $email, password: $password }) {
			...BaseUser
			name
		}
	}
	${BaseUserFragmentDoc}
`;

export function useLoginMutation() {
	return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogOutDocument = gql`
	mutation LogOut {
		logout
	}
`;

export function useLogOutMutation() {
	return Urql.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument);
}
export const RegisterDocument = gql`
	mutation Register($email: String!, $password: String!) {
		register(input: { email: $email, password: $password }) {
			...BaseUser
		}
	}
	${BaseUserFragmentDoc}
`;

export function useRegisterMutation() {
	return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
}
export const CreateProjectDocument = gql`
	mutation CreateProject($name: String!, $description: String!) {
		createProject(name: $name, description: $description) {
			...BaseProject
		}
	}
	${BaseProjectFragmentDoc}
`;

export function useCreateProjectMutation() {
	return Urql.useMutation<CreateProjectMutation, CreateProjectMutationVariables>(CreateProjectDocument);
}
export const DeleteProjectDocument = gql`
	mutation DeleteProject($id: Int!) {
		deleteProject(id: $id) {
			...BaseProject
		}
	}
	${BaseProjectFragmentDoc}
`;

export function useDeleteProjectMutation() {
	return Urql.useMutation<DeleteProjectMutation, DeleteProjectMutationVariables>(DeleteProjectDocument);
}
export const CreateTaskDocument = gql`
	mutation CreateTask($projectId: Int!, $title: String!, $description: String!) {
		createTask(projectId: $projectId, title: $title, description: $description) {
			...BaseTask
			project {
				id
				name
			}
			reporter {
				id
			}
		}
	}
	${BaseTaskFragmentDoc}
`;

export function useCreateTaskMutation() {
	return Urql.useMutation<CreateTaskMutation, CreateTaskMutationVariables>(CreateTaskDocument);
}
export const UpdateTaskDocument = gql`
	mutation UpdateTask($id: Int!, $input: TaskUpdateInput) {
		updateTask(id: $id, input: $input) {
			title
			description
			status
		}
	}
`;

export function useUpdateTaskMutation() {
	return Urql.useMutation<UpdateTaskMutation, UpdateTaskMutationVariables>(UpdateTaskDocument);
}
export const DeleteTaskDocument = gql`
	mutation DeleteTask($id: Int!) {
		deleteTask(id: $id) {
			...BaseTask
		}
	}
	${BaseTaskFragmentDoc}
`;

export function useDeleteTaskMutation() {
	return Urql.useMutation<DeleteTaskMutation, DeleteTaskMutationVariables>(DeleteTaskDocument);
}
export const UpdateUserNameDocument = gql`
	mutation UpdateUserName($email: String!, $name: String!) {
		updateUserName(email: $email, name: $name) {
			...BaseUser
		}
	}
	${BaseUserFragmentDoc}
`;

export function useUpdateUserNameMutation() {
	return Urql.useMutation<UpdateUserNameMutation, UpdateUserNameMutationVariables>(UpdateUserNameDocument);
}
export const ProjectDocument = gql`
	query Project($id: Int!) {
		project(id: $id) {
			...BaseProject
			collaborators {
				id
				name
			}
			tasks {
				id
				title
				description
				status
				reporter {
					...BaseUser
					image
				}
				asignee {
					...BaseUser
					image
				}
			}
		}
	}
	${BaseProjectFragmentDoc}
	${BaseUserFragmentDoc}
`;

export function useProjectQuery(options: Omit<Urql.UseQueryArgs<ProjectQueryVariables>, 'query'> = {}) {
	return Urql.useQuery<ProjectQuery>({ query: ProjectDocument, ...options });
}
export const ProjectsDocument = gql`
	query Projects($filter: FilterInput) {
		projects(filter: $filter) {
			...BaseProject
			collaborators {
				id
				name
			}
			owner {
				id
				name
				image
			}
			tasks {
				id
				title
			}
		}
	}
	${BaseProjectFragmentDoc}
`;

export function useProjectsQuery(options: Omit<Urql.UseQueryArgs<ProjectsQueryVariables>, 'query'> = {}) {
	return Urql.useQuery<ProjectsQuery>({ query: ProjectsDocument, ...options });
}
export const TaskDocument = gql`
	query Task($id: Int!) {
		task(id: $id) {
			...BaseTask
			project {
				id
				name
			}
			reporter {
				id
				name
				image
			}
			asignee {
				id
				name
				image
			}
			comments {
				id
				text
				task {
					id
				}
			}
		}
	}
	${BaseTaskFragmentDoc}
`;

export function useTaskQuery(options: Omit<Urql.UseQueryArgs<TaskQueryVariables>, 'query'> = {}) {
	return Urql.useQuery<TaskQuery>({ query: TaskDocument, ...options });
}
export const CurrentUserDocument = gql`
	query CurrentUser {
		currentUser {
			...BaseUser
			image
			projects {
				id
				name
			}
		}
	}
	${BaseUserFragmentDoc}
`;

export function useCurrentUserQuery(options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {}) {
	return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options });
}
export const UserByEmailDocument = gql`
	query UserByEmail($email: String!) {
		user(email: $email) {
			...BaseUser
			projects {
				id
				name
			}
		}
	}
	${BaseUserFragmentDoc}
`;

export function useUserByEmailQuery(options: Omit<Urql.UseQueryArgs<UserByEmailQueryVariables>, 'query'> = {}) {
	return Urql.useQuery<UserByEmailQuery>({ query: UserByEmailDocument, ...options });
}
export const UsersDocument = gql`
	query Users($filter: FilterInput) {
		users(filter: $filter) {
			...BaseUser
			projects {
				id
				name
			}
		}
	}
	${BaseUserFragmentDoc}
`;

export function useUsersQuery(options: Omit<Urql.UseQueryArgs<UsersQueryVariables>, 'query'> = {}) {
	return Urql.useQuery<UsersQuery>({ query: UsersDocument, ...options });
}
