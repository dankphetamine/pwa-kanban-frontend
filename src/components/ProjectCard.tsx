import { Avatar, Box, Button, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { Routes } from '../utils/constants';

export const ProjectCard = () => {
	const router = useRouter();
	return (
		<Box maxW="445px" w="full" shadow="xl" rounded="lg" p={6} overflow="hidden">
			<Stack>
				<HStack align="center" justifyContent="space-between">
					<Heading fontSize="lg">Project Title</Heading>
					<Text color={'messenger.600'} fontSize="md" fontWeight={500}>
						Project ID
					</Text>
				</HStack>
				<Text color={'gray.500'}>
					Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et
					dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
				</Text>
			</Stack>
			<HStack justifyContent="space-between">
				<Stack mt={6} direction={'row'} spacing={4} align="center">
					<Avatar src={'https://avatars0.githubusercontent.com/u/1164541?v=4'} alt={'Author'} />
					<Text fontWeight={500}>Project Owner</Text>
				</Stack>
				<Button onClick={() => router.push(Routes.project('projectId'))}>Show</Button>
			</HStack>
		</Box>
	);
};
