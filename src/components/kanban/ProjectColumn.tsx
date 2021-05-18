import { Box, Heading } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
import { Task } from '../../graphql/generated/graphql';
import { splitCamelCase } from '../../utils/constants';
import { ProjectTask } from './ProjectTask';

export const ProjectColumn = ({ text, tasks }: { text: string; tasks: Task[] }) => (
	<Droppable droppableId={text}>
		{provided => (
			<Box w="450px" h="3xl" shadow="dark-lg" rounded="xl" overflow="hidden">
				<Heading textAlign="center" p={2}>
					{splitCamelCase(text).replace(text.charAt(0), text.charAt(0).toUpperCase())}
				</Heading>
				<Box p={4} {...provided.droppableProps} ref={provided.innerRef}>
					{tasks.length &&
						tasks.map((t, i) => {
							return <ProjectTask key={t.id} task={t as Task} index={i} />;
						})}
					{provided.placeholder}
				</Box>
			</Box>
		)}
	</Droppable>
);
