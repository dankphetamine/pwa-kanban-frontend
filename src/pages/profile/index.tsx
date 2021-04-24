import { withUrqlClient } from 'next-urql';
import { useState } from 'react';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { useProjectsQuery } from '../../graphql/generated/graphql';
import { createUrqlClient } from '../../utils/uqrlUtils';

const Projects = () => {
	const [variables] = useState({ limit: 5, offset: 0 });
	const [{ data, fetching: _fetching }] = useProjectsQuery({ variables: { filter: variables } });
	// const [{ data, fetching }] = usePostsQuery({ variables: {} });

	return (
		<Container>
			<Main>
				<Header title="profile" />
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Projects);
