import { CloseIcon } from '@chakra-ui/icons';
import { Box, Heading, HStack, IconButton, Text } from '@chakra-ui/react';
import { Draggable } from 'react-beautiful-dnd';
import { Task, useDeleteTaskMutation } from '../graphql/generated/graphql';

export const ProjectTask = ({ task, index }: { task: Task; index: number }) => {
	const [, deleteTask] = useDeleteTaskMutation();

	return (
		<Draggable draggableId={task.id} index={index}>
			{provided => (
				<Box
					w="418px"
					shadow="md"
					rounded="lg"
					p={4}
					bgColor="gray.500"
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<HStack justifyContent="space-between">
						<Heading fontSize="lg">{task.title}</Heading>
						<IconButton
							aria-label="Delete task"
							icon={<CloseIcon w={4} h={4} color="red.500" />}
							onClick={() => window.confirm('Are you sure you want to delete this task?') && deleteTask()}
						/>
					</HStack>
					<Text isTruncated>{task.description}</Text>
				</Box>
			)}
		</Draggable>
	);
};
