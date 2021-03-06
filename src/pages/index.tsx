import { Box, Button, Flex, List, ListItem, SkeletonText, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useState } from 'react';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { usePostsQuery } from '../graphql/generated/graphql';
import { createUrqlClient } from '../utils/uqrlUtils';

const Index = () => {
	const [variables, setVariables] = useState({ limit: 5, offset: 0 });
	const [{ data, fetching }] = usePostsQuery({ variables: { filter: variables } });
	// const [{ data, fetching }] = usePostsQuery({ variables: {} });

	console.log(variables);
	console.log(data?.posts?.length);

	return (
		<Container>
			<Header />
			<Main>
				{fetching && (
					<Box padding="6" boxShadow="lg">
						<SkeletonText noOfLines={24} spacing={4} />
					</Box>
				)}
				<List spacing={4} my={0}>
					{!fetching && data?.posts && (
						<>
							{data.posts.map(post => {
								return (
									<ListItem key={post.id}>
										<Text fontSize={'xl'}>{post.title}</Text>
										<Text fontSize={'small'}>{post.content}</Text>
									</ListItem>
								);
							})}
						</>
					)}
				</List>
				<Flex justifyContent="space-between">
					<Button
						onClick={() => {
							if (data?.posts) {
								const osVal = Math.max(0, variables.offset - variables.limit);

								setVariables({ limit: variables.limit, offset: osVal });
							}
						}}
						variant="solid"
						isLoading={fetching}
						isDisabled={variables.offset < 1}
					>
						Go back
					</Button>
					<Button
						onClick={() => {
							if (data?.posts) {
								const osVal = Math.max(data?.posts?.length + (variables.offset ?? 0));
								setVariables({ limit: variables.limit, offset: osVal });
							}
						}}
						variant="solid"
						isLoading={fetching}
						isDisabled={(data?.posts?.length ?? 0) < variables.limit}
					>
						Go forward
					</Button>
				</Flex>
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Index);
