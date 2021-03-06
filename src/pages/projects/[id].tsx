import { Box, SimpleGrid, SkeletonText } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { Container } from 'next/app';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { usePostsQuery } from '../../graphql/generated/graphql';
import { createUrqlClient } from '../../utils/uqrlUtils';

const Project = () => {
	const [variables] = useState({ limit: 5, offset: 0 });
	const [{ data, fetching }] = usePostsQuery({ variables: { filter: variables } });
	const router = useRouter();
	const { pid } = router.query;
	// const [{ data, fetching }] = usePostsQuery({ variables: {} });

	console.log(variables);
	console.log(data?.posts?.length);

	return (
		<Container width="50">
			<Main>
				<Header title="Project ID" />
				{fetching && (
					<Box padding="6" boxShadow="lg">
						<SkeletonText noOfLines={24} spacing={4} />
					</Box>
				)}
				<SimpleGrid columns={2} spacingX="12" spacingY="12" mb="8"></SimpleGrid>
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Project);
