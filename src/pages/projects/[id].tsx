import { Box, SimpleGrid, SkeletonText } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Column } from '../../components/Column';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { Redirect } from '../../components/Redirect';
import { useCurrentUserQuery, useProjectQuery } from '../../graphql/generated/graphql';
import { createUrqlClient } from '../../utils/uqrlUtils';

const Project = () => {
	const router = useRouter();
	const { id } = router.query;
	if (!id || typeof id !== 'string') return Redirect('/');

	const [{ data: userData, fetching: userFetching }] = useCurrentUserQuery();
	const [{ data, fetching }] = useProjectQuery({ variables: { id: parseInt(id) } });

	if (!userFetching && !fetching && !data?.project?.collaborators?.some(u => u.id === userData?.currentUser?.id))
		Redirect('/');

	const initialColumns = {
		toDo: {
			name: 'toDo',
			tasks: ['Task 1', 'Task 2', 'Task 3'],
		},
		inProgress: {
			name: 'inProgress',
			tasks: ['Task 4', 'Task 5'],
		},
		done: {
			name: 'done',
			tasks: ['Task 6'],
		},
	};

	const [columns, setColumns] = useState(initialColumns);

	const onDragEnd = ({ source, destination }: DropResult) => {
		if (!destination || (source.droppableId === destination.droppableId && destination.index === source.index)) return;

		const start: { name: string; tasks: string[] } = columns[source.droppableId];
		const end: { name: string; tasks: string[] } = columns[destination.droppableId];

		if (start === end) {
			const newList = start.tasks.filter((_, i) => i !== source.index);

			newList.splice(destination.index, 0, start.tasks[source.index]);

			const newCol: { name: string; tasks: string[] } = {
				name: start.name,
				tasks: newList,
			};

			return setColumns(state => ({ ...state, [newCol.name]: newCol }));
		} else {
			const newStartList = start.tasks.filter((_, i) => i !== source.index);

			const newStartCol: { name: string; tasks: string[] } = {
				name: start.name,
				tasks: newStartList,
			};
			end.tasks.splice(destination.index, 0, start.tasks[source.index]);

			const newEndCol: { name: string; tasks: string[] } = {
				name: end.name,
				tasks: end.tasks,
			};

			return setColumns(state => ({
				...state,
				[newStartCol.name]: newStartCol,
				[newEndCol.name]: newEndCol,
			}));
		}
	};

	return (
		<Container width="50">
			<Main>
				{fetching && (
					<Box padding="6" boxShadow="lg">
						<SkeletonText noOfLines={24} spacing={4} />
					</Box>
				)}
				<Header title={`Project ${id}`} />
				<DragDropContext onDragEnd={onDragEnd}>
					<SimpleGrid columns={3} spacingX="56" spacingY="16" mb="8">
						{Object.values(columns).map((col, i) => (
							<Column key={i} name={col.name} tasks={col.tasks} />
						))}
					</SimpleGrid>
				</DragDropContext>
				{/* <SimpleGrid columns={3} spacingX="12" spacingY="12" mb="8">
					{boardColumns.map(col => {
						return (
							<ProjectColumn
								key={col}
								text={capitalizeString(col)}
								tasks={data?.project?.tasks?.filter(t => t.status === col) as Task[]}
							></ProjectColumn>
						);
					})}
				</SimpleGrid> */}
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Project);
