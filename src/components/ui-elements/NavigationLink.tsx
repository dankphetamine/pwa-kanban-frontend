import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import NextLink, { LinkProps } from 'next/link';
import { sentenceCaseString } from '../../utils/constants';

type AccessibleLinkProps = LinkProps & ChakraLinkProps;

export const Link = ({ href, isExternal, as, text }: AccessibleLinkProps & { text?: string }) => {
	return (
		<NextLink href={href} as={as} passHref>
			<ChakraLink isExternal={isExternal}>
				{text ? sentenceCaseString(text) : sentenceCaseString(href.split('/').pop()!) ?? sentenceCaseString(href)}
			</ChakraLink>
		</NextLink>
	);
};
