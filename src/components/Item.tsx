import { useColorMode } from '@chakra-ui/color-mode';
import { Box, Heading, HStack, Text } from '@chakra-ui/layout';
import { Draggable } from 'react-beautiful-dnd';
import { Colors } from '../utils/constants';

const Item = ({ text, index }: { text: string; index: number }) => {
	const { colorMode } = useColorMode();

	return (
		<Draggable draggableId={text} index={index}>
			{provided => (
				<Box
					bgColor={Colors.card[colorMode]}
					color={Colors.color[colorMode === 'dark' ? 'light' : 'dark']}
					w="413px"
					shadow="lg"
					rounded="lg"
					p={4}
					ref={provided.innerRef}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
				>
					<HStack justifyContent="space-between">
						<Heading fontSize="md">{text}</Heading>
					</HStack>
					<Text isTruncated>{`this is the description for ${text}`}</Text>
				</Box>
			)}
		</Draggable>
	);
};

export default Item;
