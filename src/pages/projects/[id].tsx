import { Box, SimpleGrid, SkeletonText } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';
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

	const [{ data: userData }] = useCurrentUserQuery();
	const [{ data, fetching }] = useProjectQuery({ variables: { id: parseInt(id) } });

	if (!data?.project?.collaborators?.some(u => u.id === userData?.currentUser?.id)) Redirect('/');

	const initialColumns = {
		todo: {
			id: 'todo',
			list: ['item 1', 'item 2', 'item 3'],
		},
		doing: {
			id: 'doing',
			list: [],
		},
		done: {
			id: 'done',
			list: [],
		},
	};

	const [columns, setColumns] = useState(initialColumns);

	const onDragEnd = ({ source, destination }: DropResult) => {
		if (destination === undefined || destination === null) return null;
		if (source.droppableId === destination.droppableId && destination.index === source.index) return null;

		const start = columns[source.droppableId];
		const end = columns[destination.droppableId];

		if (start === end) {
			const newList = start.list.filter((_, idx: number) => idx !== source.index);

			newList.splice(destination.index, 0, start.list[source.index]);

			const newCol = { id: start.id, list: newList };

			setColumns(state => ({ ...state, [newCol.id]: newCol }));
			return null;
		} else {
			const newStartList = start.list.filter((_, idx: number) => idx !== source.index);

			const newStartCol = { id: start.id, list: newStartList };

			const newEndList = end.list;

			newEndList.splice(destination.index, 0, start.list[source.index]);

			const newEndCol = {
				id: end.id,
				list: newEndList,
			};

			setColumns(state => ({
				...state,
				[newStartCol.id]: newStartCol,
				[newEndCol.id]: newEndCol,
			}));
			return null;
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
							<Column key={i} name={col.id} tasks={col.list} />
						))}
					</SimpleGrid>
					{/* <SimpleGrid columns={3} spacingX="12" spacingY="12" mb="8">
						{columnArray.map(txt => {
							return (
								<ProjectColumn
									key={txt}
									text={capitalizeString(txt)}
									tasks={data?.project?.tasks?.filter(t => t.status === txt) as Task[]}
								></ProjectColumn>
							);
						})}
					</SimpleGrid> */}
				</DragDropContext>
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Project);
