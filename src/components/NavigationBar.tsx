import { Button, chakra, Flex, Stack, useColorMode } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { Colors, Routes } from '../utils/constants';
import { ColorModeSwitch } from './ColorModeSwitch';
import Link from './NavigationLink';

const NavBar = () => {
	const { colorMode } = useColorMode();
	const router = useRouter();
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
			</Flex>
			<ColorModeSwitch />
		</chakra.header>
	);
};

export default NavBar;
