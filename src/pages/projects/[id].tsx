import { Box, SimpleGrid, SkeletonText } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { useCurrentUserQuery, useProjectQuery } from '../../graphql/generated/graphql';
import { createUrqlClient } from '../../utils/uqrlUtils';
import { Container } from '../../components/Container';
import { Redirect } from '../../components/Redirect';

const Project = () => {
	const router = useRouter();
	const { id } = router.query;
	if (!id || typeof id !== 'string') return Redirect('/');

	const [{ data: userData }] = useCurrentUserQuery();
	const [{ data, fetching }] = useProjectQuery({ variables: { id: parseInt(id) } });

	if (data?.project?.collaborators?.some(u => u.id === userData?.currentUser?.id)) {
		return Redirect('/');
	}

	const tasks = data?.project?.tasks;
	console.log(tasks);

	return (
		<Container width="50">
			<Main>
				{fetching && (
					<Box padding="6" boxShadow="lg">
						<SkeletonText noOfLines={24} spacing={4} />
					</Box>
				)}
				<Header title={`Project ${id}`} />
				<SimpleGrid columns={4} spacingX="12" spacingY="12" mb="8"></SimpleGrid>
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Project);
