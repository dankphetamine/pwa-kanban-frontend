import { Box, SkeletonText } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { Container } from '../components/Container';
import { Header } from '../components/Header';
import { Main } from '../components/Main';
import { Redirect } from '../components/Redirect';
import { useCurrentUserQuery } from '../graphql/generated/graphql';
import { createUrqlClient } from '../utils/uqrlUtils';

const Project = () => {
	const [{ data, fetching }] = useCurrentUserQuery();

	if (!fetching && !data?.currentUser) Redirect('/');

	return (
		<Container width="50">
			<Main>
				{fetching && (
					<Box padding="6" boxShadow="lg">
						<SkeletonText noOfLines={24} spacing={4} />
					</Box>
				)}
				{!fetching && (
					<>
						<Header title={'Create a new project'} />
						<Box></Box>
					</>
				)}
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Project);
