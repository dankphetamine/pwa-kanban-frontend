import { Flex, Heading } from '@chakra-ui/react';

export const Header = ({ title }: { title: string }) => (
	<Flex justifyContent="center" alignItems="center">
		<Heading fontSize="56pt">{title}</Heading>
	</Flex>
);

Header.defaultProps = {
	title: 'Header',
};
