import { Box, SimpleGrid, SkeletonText } from '@chakra-ui/react';
import { isInteger } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import { useReducer } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { ProjectColumn } from '../../components/ProjectColumn';
import { Redirect } from '../../components/Redirect';
import { Task, useProjectQuery, useUpdateTaskMutation } from '../../graphql/generated/graphql';
import { Column, ColumnState, DragNDropAction, DragNDropStatus, initialColumns } from '../../utils/constants';
import { createUrqlClient } from '../../utils/uqrlUtils';

const Project = () => {
	const router = useRouter();
	const { id } = router.query;
	if (!id || !isInteger(id) || typeof id !== 'string') return Redirect();
	const [{ data, fetching }] = useProjectQuery({ variables: { id: parseInt(id) } });

	const [, updateTask] = useUpdateTaskMutation();

	/** Reducer function */
	const reducer = (columnState: ColumnState, action: DragNDropAction): ColumnState => {
		if (action.type === DragNDropStatus.Reordered) return { ...columnState, ...action.payload };
		if (action.type === DragNDropStatus.Moved) {
			// run UPDATE mutation
			// Temporary shit solution to console log inside empty .then() to allow promise without async parent
			updateTask({ id: parseInt(action.event.draggableId), input: action.event.input }).then();

			return { ...columnState, ...action.payload };
		}

		return columnState;
	};

	function populateColumns(columns: ColumnState) {
		// check if columnState has any elements in tasks array
		if (!Object.values(columns).some(col => col.tasks.length)) {
			Object.values(columns).forEach(col => {
				const filteredTasks = data?.project?.tasks?.filter(t => t.status?.toLowerCase() === col.name.toLowerCase());
				filteredTasks?.forEach(t => {
					if (!col.tasks.some(t2 => t2.id === t.id)) col.tasks.push(t as Task);
				});
			});
		}

		return columns;
	}

	const [columnState, dispatch] = useReducer(reducer, populateColumns(initialColumns));

	const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
		if (!destination || (source.droppableId === destination.droppableId && destination.index === source.index)) return;

		const startCol = columnState[source.droppableId];
		const endCol = columnState[destination.droppableId];

		if (startCol === endCol) {
			// reordered
			const newList = startCol.tasks.filter((_, i) => i !== source.index);

			newList.splice(destination.index, 0, startCol.tasks[source.index]);

			const newCol: Column = { name: startCol.name, tasks: newList };

			return dispatch({
				type: DragNDropStatus.Reordered,
				payload: { [newCol.name]: newCol },
				event: { draggableId, input: { status: endCol.name } },
			});
		} else {
			const newStartList = startCol.tasks.filter((_, i) => i !== source.index);

			const newStartCol: Column = { name: startCol.name, tasks: newStartList };

			endCol.tasks.splice(destination.index, 0, startCol.tasks[source.index]);

			const newEndCol: Column = { name: endCol.name, tasks: endCol.tasks };

			return dispatch({
				type: DragNDropStatus.Moved,
				payload: { [newStartCol.name]: newStartCol, [newEndCol.name]: newEndCol },
				event: { draggableId, input: { status: endCol.name } },
			});
		}
	};

	return (
		<Container>
			<Main>
				{fetching && (
					<Box padding="6" boxShadow="lg">
						<SkeletonText noOfLines={24} spacing={4} />
					</Box>
				)}
				{data?.project && (
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
