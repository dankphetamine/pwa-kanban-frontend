import { AddIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, SimpleGrid, SkeletonCircle, SkeletonText, Spacer } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { ProjectCard } from '../components/ProjectCard';
import { useProjectsQuery } from '../graphql/generated/graphql';
import { Routes } from '../utils/constants';
import { createUrqlClient } from '../utils/uqrlUtils';

const Projects = () => {
	const [variables] = useState({ limit: 5, offset: 0 });
	const [{ data, fetching }] = useProjectsQuery({ variables: { filter: variables } });
	const router = useRouter();

	return (
		<Container>
			<Main>
				<Flex minW="container.xl">
					<Header title="projects" />

					<Spacer />

					<IconButton
						aria-label="Search database"
						icon={<AddIcon />}
						size="lg"
						variant="solid"
						colorScheme="green"
						onClick={() => router.push(Routes.project_add)}
					/>
				</Flex>

				{fetching && (
					<SimpleGrid columns={3} spacingX="12" spacingY="12" mb="8">
						<Box padding="6" boxShadow="lg">
							<SkeletonCircle size="10" />
							<SkeletonText mt="4" noOfLines={4} />
						</Box>
						<Box padding="6" boxShadow="lg">
							<SkeletonCircle size="10" />
							<SkeletonText mt="4" noOfLines={4} />
						</Box>
						<Box padding="6" boxShadow="lg">
							<SkeletonCircle size="10" />
							<SkeletonText mt="4" noOfLines={4} />
						</Box>
					</SimpleGrid>
				)}
				{!fetching && !data && (
					<Box my={12}>
						<Header title="No projects found" />
					</Box>
				)}
				<SimpleGrid columns={3} spacingX="12" spacingY="12" mb="8">
					{!fetching &&
						data?.projects?.map(p => {
							return (
								<ProjectCard
									key={p.id}
									id={p.id}
									name={p.name}
									description={p.description ?? ''}
									owner={{ id: p.owner.id!, name: p.owner.name!, image: p.owner.image! }}
								/>
							);
						})}
				</SimpleGrid>
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Projects);
