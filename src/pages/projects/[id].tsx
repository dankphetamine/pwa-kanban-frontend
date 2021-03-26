import { Box, SimpleGrid, SkeletonText } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React, { useReducer } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { ProjectColumn } from '../../components/ProjectColumn';
import { Redirect } from '../../components/Redirect';
import { Task, useCurrentUserQuery, useProjectQuery } from '../../graphql/generated/graphql';
import { Action, ColumnState, DragNDropStatus, initialColumns } from '../../utils/constants';
import { createUrqlClient } from '../../utils/uqrlUtils';

const Project = () => {
	const router = useRouter();
	const { id } = router.query;
	if (!id || typeof id !== 'string') return Redirect('/');

	const [{ data: userData, fetching: userFetching }] = useCurrentUserQuery();
	const [{ data, fetching }] = useProjectQuery({ variables: { id: parseInt(id) } });

	if (!userFetching && !fetching && !data?.project?.collaborators?.some(u => u.id === userData?.currentUser?.id))
		return Redirect('/');

	Object.values(initialColumns).forEach(col => {
		const filteredTasks = data?.project?.tasks?.filter(t => t.status?.toLowerCase() === col.name.toLowerCase());
		if (!filteredTasks) return;

		filteredTasks.forEach(t => {
			col.tasks.push(t as Task);
		});
	});

	/** Reducer function */
	function reducer(columnState: ColumnState, action: Action): ColumnState {
		if (action.type === DragNDropStatus.Reordered) return { ...columnState, ...action.payload };
		if (action.type === DragNDropStatus.Moved) return { ...columnState, ...action.payload };
		return columnState;
	}

	const [columnState, dispatch] = useReducer(reducer, initialColumns);

	const onDragEnd = ({ source, destination }: DropResult) => {
		if (!destination || (source.droppableId === destination.droppableId && destination.index === source.index)) return;

		const start: { name: string; tasks: Task[] } = columnState[source.droppableId];
		const end: { name: string; tasks: Task[] } = columnState[destination.droppableId];

		if (start === end) {
			const newList = start.tasks.filter((_, i) => i !== source.index);

			newList.splice(destination.index, 0, start.tasks[source.index]);

			const newCol: { name: string; tasks: Task[] } = {
				name: start.name,
				tasks: newList,
			};

			return dispatch({
				type: DragNDropStatus.Reordered,
				payload: { [newCol.name]: newCol },
			});
		} else {
			const newStartList = start.tasks.filter((_, i) => i !== source.index);

			const newStartCol: { name: string; tasks: Task[] } = {
				name: start.name,
				tasks: newStartList,
			};
			end.tasks.splice(destination.index, 0, start.tasks[source.index]);

			const newEndCol: { name: string; tasks: Task[] } = {
				name: end.name,
				tasks: end.tasks,
			};

			return dispatch({
				type: DragNDropStatus.Moved,
				payload: { [newStartCol.name]: newStartCol, [newEndCol.name]: newEndCol },
			});
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
				{!fetching && (
					<>
						<Header title={`Project ${id}`} />
						<DragDropContext onDragEnd={onDragEnd}>
							<SimpleGrid columns={3} spacingX="56" spacingY="16" mb="8">
								{Object.values(columnState).map(col => (
									<ProjectColumn key={col.name} tasks={col.tasks} text={col.name} />
								))}
							</SimpleGrid>
						</DragDropContext>
					</>
				)}
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Project);
