import { Box, List, ListItem, SkeletonText, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { useGetPostsQuery } from '../graphql/generated/graphql';
import { createUrqlClient } from '../utils/uqrlUtils';

const Index = () => {
	const [{ data, fetching }] = useGetPostsQuery();

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
					{!fetching && data?.getPosts && (
						<>
							{data.getPosts.map(post => {
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
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Index);
