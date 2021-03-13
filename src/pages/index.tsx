import { Box, Button, Flex, List, ListItem, SkeletonText, Text } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useState } from 'react';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { useProjectsQuery } from '../graphql/generated/graphql';
import { createUrqlClient } from '../utils/uqrlUtils';

const Index = () => {
	const [variables, setVariables] = useState({ limit: 5, offset: 0 });
	const [{ data, fetching }] = useProjectsQuery({ variables: { filter: variables } });

	console.log(variables);
	console.log(data?.projects?.length);

	return (
		<Container>
			<Main>
				<Header />
				{fetching && (
					<Box padding="6" boxShadow="lg">
						<SkeletonText noOfLines={24} spacing={4} />
					</Box>
				)}
				<List spacing={4} my={0}>
					{!fetching && data?.projects && (
						<>
							{data.projects.map(p => (
								<ListItem key={p.id}>
									<Text fontSize={'xl'}>{p.name}</Text>
									<Text fontSize={'small'}>{p.description}</Text>
								</ListItem>
							))}
						</>
					)}
				</List>
				<Flex justifyContent="space-between">
					<Button
						onClick={() => {
							if (data?.projects) {
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
							if (data?.projects) {
								const osVal = Math.max(data?.projects?.length + (variables.offset ?? 0));
								setVariables({ limit: variables.limit, offset: osVal });
							}
						}}
						variant="solid"
						isLoading={fetching}
						isDisabled={(data?.projects?.length ?? 0) < variables.limit}
					>
						Go forward
					</Button>
				</Flex>
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Index);
