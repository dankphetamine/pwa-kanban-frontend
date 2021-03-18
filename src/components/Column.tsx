import { useColorMode } from '@chakra-ui/color-mode';
import { Box, Heading, VStack } from '@chakra-ui/layout';
import { Droppable } from 'react-beautiful-dnd';
import { capitalizeString, Colors } from '../utils/constants';
import Item from './Item';

export const Column = ({ name, tasks }: { name: string; tasks: string[] }) => {
	const { colorMode } = useColorMode();

	return (
		<Droppable droppableId={name}>
			{provided => (
				<Box>
					<Heading textAlign="center" p={2}>
						{capitalizeString(name)}
					</Heading>
					<Box
						bgColor={Colors.board[colorMode]}
						w="445px"
						h="xl"
						shadow="xl"
						rounded="xl"
						overflowY="auto"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						<Box px={4} py={8}>
							<VStack spacing={4}>
								{tasks.map((t, i) => {
									return <Item key={t} text={capitalizeString(t.toString())} index={i} />;
								})}
								{provided.placeholder}
							</VStack>
						</Box>
					</Box>
				</Box>
			)}
		</Droppable>
	);
};
