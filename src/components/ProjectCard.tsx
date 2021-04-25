import { CloseIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Heading, HStack, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { useCurrentUserQuery, useDeleteTaskMutation, User } from '../graphql/generated/graphql';
import { Routes } from '../utils/constants';

export const ProjectCard = ({
	name,
	description,
	id,
	owner,
}: {
	name: string;
	description: string;
	id: number;
	owner: Pick<User, 'id' | 'name' | 'image'>;
}) => {
	const router = useRouter();
	const [{ data }] = useCurrentUserQuery();
	const isOwner = data?.currentUser?.id === owner.id;
	const [, deleteTask] = useDeleteTaskMutation();

	return (
		<Box w="445px" shadow="xl" rounded="lg" p={6} overflow="hidden">
			<HStack justifyContent="space-between">
				<Heading fontSize="lg">{name}</Heading>
				{isOwner && (
					<IconButton
						aria-label="Delete project"
						icon={<CloseIcon w={4} h={4} color="red.500" />}
						onClick={() => window.confirm('Are you sure you want to delete this project?') && deleteTask({ id })}
					/>
				)}
			</HStack>
			<Text color={'messenger.400'}>{description}</Text>
			<HStack mt={6} justifyContent="space-between">
				<HStack spacing={4}>
					<Avatar src={owner.image!} alt={'P P'} />
					<Text fontWeight={500}>{owner.name}</Text>
				</HStack>
				<Button isDisabled={data?.currentUser?.id !== owner.id} onClick={() => router.push(Routes.project(id))}>
					Show
				</Button>
			</HStack>
		</Box>
	);
};
