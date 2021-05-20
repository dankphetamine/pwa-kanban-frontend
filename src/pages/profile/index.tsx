import { Box, Heading, HStack, SimpleGrid, Text, VStack } from '@chakra-ui/layout';
import { withUrqlClient } from 'next-urql';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { Redirect } from '../../components/Redirect';
import { useCurrentUserQuery, useProjectsQuery } from '../../graphql/generated/graphql';
import { Queries, Routes } from '../../utils/constants';
import { createUrqlClient } from '../../utils/uqrlUtils';

const Profile = () => {
	const [{ data: userData, fetching }] = useCurrentUserQuery();
	if (!fetching && !userData) return <Redirect url={Routes.login} />;

	const [{ data, fetching: _fetching }] = useProjectsQuery({ variables: { filter: { limit: Queries.limitMax } } });

	return (
		<Container>
			<Main>
				<Header title="profile & Statistics" />

				<SimpleGrid columns={2} spacing={64}>
					{!fetching && data?.projects && (
						<>
							<Box height="250px">
								<Heading>Projects</Heading>
								<VStack>
									{data?.projects?.map((p, i) => {
										return (
											<Box w="445px" shadow="md" rounded="lg" p={6} key={i}>
												<HStack justifyContent="space-between">
													<Heading fontSize="lg">{p.name}</Heading>
												</HStack>
												<Text>{p.description}</Text>
											</Box>
										);
									})}
								</VStack>
							</Box>

							<Box height="250px">
								<Heading>Tasks</Heading>
								<VStack>
									<>
										{data.projects.forEach(p => {
											p.tasks?.map((t, i) => {
												return <Text key={i}>{JSON.stringify(t, null, 2)}</Text>;
											});
										})}
									</>
								</VStack>
							</Box>
						</>
					)}
				</SimpleGrid>
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Profile);
