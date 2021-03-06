import { Flex, Heading } from '@chakra-ui/react';
import { capitalizeString } from '../utils/text';

export const Header = ({ title }: { title: string }) => (
	<Flex justifyContent="center" alignItems="center">
		<Heading fontSize="32pt">{capitalizeString(title)}</Heading>
	</Flex>
);

Header.defaultProps = {
	title: 'Header',
};
