import { Avatar, Button, chakra, Flex, Stack, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { useGetCurrentUserQuery } from '../graphql/generated/graphql';
import { Colors, Routes } from '../utils/constants';
import { ColorModeSwitch } from './ColorModeSwitch';
import Link from './NavigationLink';

const NavBar = () => {
	const { colorMode } = useColorMode();
	const router = useRouter();
	const [{ data }] = useGetCurrentUserQuery();

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
				<Stack direction="row" display="flex" alignItems="center" spacing="1rem">
					{!data?.getCurrentUser && (
						<Button variant="solid" onClick={() => router.push(Routes.login)}>
							Sign in | Sign up
						</Button>
					)}
					{data?.getCurrentUser && (
						<>
							<Button
								onClick={() => router.push(Routes.profile)}
								leftIcon={<Avatar name={data.getCurrentUser.name ?? '? ?'} src={data.getCurrentUser.image!} />}
							>
								<Link href={Routes.profile} />
							</Button>
							<Button variant="solid" onClick={() => window.confirm('Are you sure you want to sign out?')}>
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

export default NavBar;
