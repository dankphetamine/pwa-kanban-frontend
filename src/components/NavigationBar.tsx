import { Avatar, Box, Button, chakra, Flex, Skeleton, Stack, useColorMode } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import { useCurrentUserQuery, useLogOutMutation } from '../graphql/generated/graphql';
import { Colors, Routes } from '../utils/constants';
import { createUrqlClient } from '../utils/uqrlUtils';
import { ColorModeSwitch } from './ColorModeSwitch';
import Link from './NavigationLink';

const NavBar = () => {
	const { colorMode } = useColorMode();
	const router = useRouter();
	const [{ data, fetching }] = useCurrentUserQuery();
	const [, logOut] = useLogOutMutation();

	return (
		<chakra.header bgColor={Colors.bgColor[colorMode]} color={Colors.color[colorMode]} w="full" p={4} shadow="lg">
			<Flex alignItems="center" justifyContent="space-between" mx="auto">
				<Stack direction="row" display="flex" alignItems="center" spacing="1rem">
					<Button onClick={() => router.push(Routes.home)}>
						<Link href={Routes.home} text="home" />
					</Button>
					<Button onClick={() => router.push(Routes.projects)}>
						<Link href={Routes.projects} />
					</Button>
				</Stack>
				<Stack direction="row" display="flex" alignItems="center" spacing="2rem">
					{fetching && (
						<Box>
							<Skeleton />
						</Box>
					)}

					{!fetching && !data?.currentUser && (
						<Button variant="solid" onClick={() => router.push(Routes.login)}>
							Sign in | Sign up
						</Button>
					)}
					{!fetching && data?.currentUser && (
						<>
							<Button
								onClick={() => router.push(Routes.profile)}
								leftIcon={<Avatar name={data.currentUser.name ?? '? ?'} src={data.currentUser.image!} />}
							>
								<Link href={Routes.profile} />
							</Button>
							<Button variant="solid" onClick={() => window.confirm('Are you sure you want to sign out?') && logOut()}>
								Sign out
							</Button>
						</>
					)}
				</Stack>
			</Flex>
			<ColorModeSwitch />
		</chakra.header>
	);
};

export default withUrqlClient(createUrqlClient)(NavBar);
