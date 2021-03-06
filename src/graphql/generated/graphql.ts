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
  posts?: Maybe<Array<Post>>;
  getPosts?: Maybe<Array<Post>>;
  post?: Maybe<Post>;
  getUser?: Maybe<User>;
  getusers?: Maybe<Array<User>>;
  currentUser?: Maybe<User>;
};


export type QueryPostsArgs = {
  filter?: Maybe<PostFilterInput>;
};


export type QueryGetPostsArgs = {
  offset?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};


export type QueryPostArgs = {
  id: Scalars['Float'];
};


export type QueryGetUserArgs = {
  email: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  content: Scalars['String'];
  published: Scalars['Boolean'];
  author: User;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Post>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};


export type PostFilterInput = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['Int']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createPost: Post;
  register: User;
  login: User;
  updateName?: Maybe<User>;
  logout: Scalars['Boolean'];
};


export type MutationCreatePostArgs = {
  content: Scalars['String'];
  title: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: AuthInput;
};


export type MutationLoginArgs = {
  input: AuthInput;
};


export type MutationUpdateNameArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type BaseUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'createdAt' | 'updatedAt'>
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'User' }
    & Pick<User, 'name'>
    & BaseUserFragment
  ) }
);

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'User' }
    & BaseUserFragment
  ) }
);

export type PostsQueryVariables = Exact<{
  filter?: Maybe<PostFilterInput>;
}>;


export type PostsQuery = (
  { __typename?: 'Query' }
  & { posts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'content'>
  )>> }
);

export type GetPostsQueryVariables = Exact<{
  limit: Scalars['Int'];
  offset?: Maybe<Scalars['Int']>;
}>;


export type GetPostsQuery = (
  { __typename?: 'Query' }
  & { getPosts?: Maybe<Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'content'>
  )>> }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name' | 'image'>
    & BaseUserFragment
  )> }
);

export const BaseUserFragmentDoc = gql`
    fragment BaseUser on User {
  id
  email
  createdAt
  updatedAt
}
    `;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(input: {email: $email, password: $password}) {
    ...BaseUser
    name
  }
}
    ${BaseUserFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogOutDocument = gql`
    mutation LogOut {
  logout
}
    `;

export function useLogOutMutation() {
  return Urql.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!) {
  register(input: {email: $email, password: $password}) {
    ...BaseUser
  }
}
    ${BaseUserFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const PostsDocument = gql`
    query Posts($filter: PostFilterInput) {
  posts(filter: $filter) {
    id
    title
    content
  }
}
    `;

export function usePostsQuery(options: Omit<Urql.UseQueryArgs<PostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PostsQuery>({ query: PostsDocument, ...options });
};
export const GetPostsDocument = gql`
    query GetPosts($limit: Int!, $offset: Int) {
  getPosts(limit: $limit, offset: $offset) {
    id
    content
  }
}
    `;

export function useGetPostsQuery(options: Omit<Urql.UseQueryArgs<GetPostsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPostsQuery>({ query: GetPostsDocument, ...options });
};
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    ...BaseUser
    name
    image
  }
}
    ${BaseUserFragmentDoc}`;

export function useCurrentUserQuery(options: Omit<Urql.UseQueryArgs<CurrentUserQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrentUserQuery>({ query: CurrentUserDocument, ...options });
};