import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import NextLink, { LinkProps } from 'next/link';
import { capitalizeString } from '../utils/text';

type AccessibleLinkProps = LinkProps & ChakraLinkProps;

const Link = ({ href, isExternal, as, text }: AccessibleLinkProps & { text?: string }) => {
	return (
		<NextLink href={href} as={as} passHref>
			<ChakraLink isExternal={isExternal}>
				{text ? capitalizeString(text) : capitalizeString(href.split('/').pop()!) ?? capitalizeString(href)}
			</ChakraLink>
		</NextLink>
	);
};

export default Link;
