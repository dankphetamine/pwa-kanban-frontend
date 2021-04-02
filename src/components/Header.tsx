import { Flex, Heading } from '@chakra-ui/react';
import { sentenceCaseString } from '../utils/constants';

export const Header = ({ title }: { title: string }) => (
	<Flex justifyContent="center" alignItems="center">
		<Heading fontSize="32pt">{sentenceCaseString(title)}</Heading>
	</Flex>
);

Header.defaultProps = {
	title: 'Header',
};
