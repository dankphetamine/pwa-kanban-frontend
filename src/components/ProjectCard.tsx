import { Avatar, Box, Button, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { Routes } from '../utils/constants';
import Link from './NavigationLink';

export const ProjectCard = ({
	name,
	description,
	id,
	owner,
}: {
	name: string;
	description: string;
	id: number;
	owner: { name: string; image: string };
}) => {
	const router = useRouter();
	return (
		<Box w="445px" minH="" shadow="xl" rounded="lg" p={6} overflow="hidden">
			<Stack>
				<Heading fontSize="lg">{name}</Heading>
				<Text color={'messenger.400'}>{description}</Text>
			</Stack>
			<HStack mt={6} justifyContent="space-between">
				<HStack spacing={4}>
					<Avatar src={owner.image} alt={'P P'} />
					<Text fontWeight={500}>{owner.name}</Text>
				</HStack>
				<Button onClick={() => router.push(Routes.project(id))}>
					<Link href={Routes.project(id)} text="Show" />
				</Button>
			</HStack>
		</Box>
	);
};
