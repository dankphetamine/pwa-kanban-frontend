import { withUrqlClient } from 'next-urql';
import { useState } from 'react';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { Redirect } from '../../components/Redirect';
import { useCurrentUserQuery, useProjectsQuery } from '../../graphql/generated/graphql';
import { Routes } from '../../utils/constants';
import { createUrqlClient } from '../../utils/uqrlUtils';

const Profile = () => {
	const [{ data: userData, fetching }] = useCurrentUserQuery();
	if (!fetching && !userData) return <Redirect url={Routes.login} />;

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

export default withUrqlClient(createUrqlClient)(Profile);
