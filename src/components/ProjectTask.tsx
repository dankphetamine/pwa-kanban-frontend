import { CloseIcon } from '@chakra-ui/icons';
import { Avatar, Box, Button, Heading, HStack, IconButton, Text } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import { Draggable } from 'react-beautiful-dnd';
import { Task, useCurrentUserQuery, useDeleteTaskMutation } from '../graphql/generated/graphql';
import { Routes } from '../utils/constants';

export const ProjectTask = ({ task, index }: { task: Task; index: number }) => {
	const router = useRouter();
	const [{ data }] = useCurrentUserQuery();
	const [, deleteTask] = useDeleteTaskMutation();
	const isOwner = data?.currentUser?.id === task.reporter.id;

	return (
		<Draggable draggableId={task.id} index={index}>
			{provided => (
				<Box
					w="418px"
					shadow="md"
					rounded="lg"
					p={4}
					my={2}
					bgColor="gray.600"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<HStack justifyContent="space-between">
						<Heading fontSize="lg">{task.title}</Heading>
						{isOwner && (
							<IconButton
								aria-label="Delete task"
								icon={<CloseIcon w={4} h={4} color="red.500" />}
								onClick={() => window.confirm('Are you sure you want to delete this task?') && deleteTask()}
							/>
						)}
					</HStack>
					<Text isTruncated>{task.description}</Text>
					<HStack mt={4} mr={1} justifyContent="space-between">
						<Button onClick={() => router.push(Routes.project(task.id))}></Button>
						<Avatar size="sm" src={task.asignee?.image ?? ''} name={task.asignee?.name ?? '6 9'} />
					</HStack>
				</Box>
			)}
		</Draggable>
	);
};
