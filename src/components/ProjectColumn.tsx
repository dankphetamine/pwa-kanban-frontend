import { Box, Heading, VStack } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
import { Task } from '../graphql/generated/graphql';
import { ProjectTask } from './ProjectTask';

export const ProjectColumn = ({ text, tasks }: { text: string; tasks: Task[] }) => (
	<Droppable droppableId={text}>
		{provided => (
			<Box w="450px" h="3xl" shadow="dark-lg" rounded="xl" overflow="hidden">
				<Heading textAlign="center" p={2}>
					{text}
				</Heading>
				<Box px={4} py={8} {...provided.droppableProps} ref={provided.innerRef}>
					<VStack spacing={2}>
						{tasks.length &&
							tasks.map((t, i) => {
								return <ProjectTask key={t.id} task={t as Task} index={i} />;
							})}
					</VStack>
					{provided.placeholder}
				</Box>
			</Box>
		)}
	</Droppable>
);
