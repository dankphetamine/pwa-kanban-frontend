import { Box, SimpleGrid, SkeletonText } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import { useReducer } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { Main } from '../../components/Main';
import { ProjectColumn } from '../../components/ProjectColumn';
import { Redirect } from '../../components/Redirect';
import { Task, useCurrentUserQuery, useProjectQuery } from '../../graphql/generated/graphql';
import { Action, Column, ColumnState, DragNDropStatus, initialColumns } from '../../utils/constants';
import { createUrqlClient } from '../../utils/uqrlUtils';

const Project = () => {
	const router = useRouter();
	const { id } = router.query;
	if (!id || typeof id !== 'string') return Redirect();
	const [{ data: userData }] = useCurrentUserQuery();
	const [{ data, fetching }] = useProjectQuery({ variables: { id: parseInt(id) } });

	/** Reducer function */
	const reducer = (columnState: ColumnState, action: Action): ColumnState => {
		if (action.type === DragNDropStatus.Reordered) return { ...columnState, ...action.payload };
		if (action.type === DragNDropStatus.Moved) {
			// run UPDATE mutation

			return { ...columnState, ...action.payload };
		}

		return columnState;
	};

	function populateColumns(columns: ColumnState) {
		Object.values(columns).forEach(col => {
			const filteredTasks = data?.project?.tasks?.filter(t => t.status?.toLowerCase() === col.name.toLowerCase());
			filteredTasks?.forEach(t => {
				if (!col.tasks.some(t2 => t2.id === t.id)) col.tasks.push(t as Task);
			});
		});
		return columns;
	}

	const [columnState, dispatch] = useReducer(reducer, populateColumns(initialColumns));

	if (!fetching && !data?.project?.collaborators?.some(u => u.id === userData?.currentUser?.id)) return Redirect();

	const onDragEnd = ({ source, destination }: DropResult) => {
		if (!destination || (source.droppableId === destination.droppableId && destination.index === source.index)) return;

		const startCol = columnState[source.droppableId];
		const endCol = columnState[destination.droppableId];

		if (startCol === endCol) {
			const newList = startCol.tasks.filter((_, i) => i !== source.index);

			newList.splice(destination.index, 0, startCol.tasks[source.index]);

			const newCol: Column = { name: startCol.name, tasks: newList };

			return dispatch({
				type: DragNDropStatus.Reordered,
				payload: { [newCol.name]: newCol },
			});
		} else {
			const newStartList = startCol.tasks.filter((_, i) => i !== source.index);

			const newStartCol: Column = { name: startCol.name, tasks: newStartList };

			endCol.tasks.splice(destination.index, 0, startCol.tasks[source.index]);

			const newEndCol: Column = { name: endCol.name, tasks: endCol.tasks };

			return dispatch({
				type: DragNDropStatus.Moved,
				payload: { [newStartCol.name]: newStartCol, [newEndCol.name]: newEndCol },
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
