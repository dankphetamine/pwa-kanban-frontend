import { Box, SimpleGrid, SkeletonText } from '@chakra-ui/react';
import { isInteger } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useReducer } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { Container } from '../../components/layout/Container';
import { Header } from '../../components/layout/Header';
import { Main } from '../../components/layout/Main';
import { Redirect } from '../../components/layout/Redirect';
import { useProjectQuery, useUpdateTaskMutation } from '../../graphql/generated/graphql';
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
			updateTask({ id: parseInt(action.event.draggableId), input: action.event.input }).then(() => console.log());

			return { ...columnState, ...action.payload };
		}

		return columnState;
	};

	useEffect(() => {
		if (data?.project?.tasks) {
			Object.values(data.project.tasks).forEach(_task => {
				Object.entries(initialColumns).forEach(([_key, _col]) => {
					// col.tasks.push(task);
				});
			});
		}
	}, [data?.project?.tasks]);

	const [columnState, dispatch] = useReducer(reducer, initialColumns);

	useEffect(() => {
		console.log(data?.project?.tasks);
	}, [data?.project?.tasks]);

	const onDragEnd = ({ source, destination, draggableId }: DropResult) => {
		if (!destination || (source.droppableId === destination.droppableId && destination.index === source.index)) return;

		const startCol = columnState[source.droppableId];
		const endCol = columnState[destination.droppableId];

		if (startCol === endCol) {
			const newList = Array.from(startCol.tasks);

			newList.splice(source.index, 1);
			newList.splice(destination.index, 0, newList.find(t => t.id === draggableId) || newList[draggableId]);

			const newCol: Column = { name: startCol.name, tasks: newList };

			return dispatch({
				type: DragNDropStatus.Reordered,
				payload: { [newCol.name]: newCol },
				event: { draggableId, input: { status: endCol.name } },
			});
		} else {
			const newStartList = Array.from(startCol.tasks);
			newStartList.splice(source.index, 1);

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

						<DragDropContext onDragEnd={result => onDragEnd(result)}>
							<SimpleGrid columns={3} spacing={16}>
								{Object.entries(initialColumns).map(([columnId, column]) => {
									return (
										<div
											style={{
												display: 'flex',
												flexDirection: 'column',
												alignItems: 'center',
											}}
											key={columnId}
										>
											<h2>{column.name}</h2>
											<div style={{ margin: 8 }}>
												<Droppable droppableId={columnId} key={columnId}>
													{(provided, snapshot) => {
														return (
															<div
																{...provided.droppableProps}
																ref={provided.innerRef}
																style={{
																	background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey',
																	padding: 4,
																	width: 250,
																	minHeight: 500,
																}}
															>
																{column.tasks.map((item, index) => {
																	return (
																		<Draggable key={item.id} draggableId={item.id} index={index}>
																			{(provided, snapshot) => {
																				return (
																					<div
																						ref={provided.innerRef}
																						{...provided.draggableProps}
																						{...provided.dragHandleProps}
																						style={{
																							userSelect: 'none',
																							padding: 16,
																							margin: '0 0 8px 0',
																							minHeight: '50px',
																							backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
																							color: 'white',
																							...provided.draggableProps.style,
																						}}
																					>
																						{item.title}
																					</div>
																				);
																			}}
																		</Draggable>
																	);
																})}
																{provided.placeholder}
															</div>
														);
													}}
												</Droppable>
											</div>
										</div>
									);
								})}
							</SimpleGrid>
						</DragDropContext>
					</>
				)}
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Project);
