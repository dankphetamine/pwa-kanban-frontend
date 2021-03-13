import { Box, SimpleGrid, SkeletonText } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useState } from 'react';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { ProjectCard } from '../components/ProjectCard';
import { useProjectsQuery } from '../graphql/generated/graphql';
import { createUrqlClient } from '../utils/uqrlUtils';

const Projects = () => {
	const [variables] = useState({ limit: 5, offset: 0 });
	const [{ data, fetching }] = useProjectsQuery({ variables: { filter: variables } });
	// const [{ data, fetching }] = usePostsQuery({ variables: {} });

	console.log(variables);
	console.log(data?.projects?.length);

	return (
		<Container width="50">
			<Main>
				<Header title="projects" />
				{fetching && (
					<Box padding="6" boxShadow="lg">
						<SkeletonText noOfLines={24} spacing={4} />
					</Box>
				)}
				<SimpleGrid columns={2} spacingX="12" spacingY="12" mb="8">
					<ProjectCard />
					<ProjectCard />
					<ProjectCard />
				</SimpleGrid>
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Projects);
