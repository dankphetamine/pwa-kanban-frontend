import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import Link, { LinkProps } from 'next/link';
import { capitalizeString } from '../utils/text';

type AccessibleLinkProps = LinkProps & ChakraLinkProps;

const NavLink = ({ href, isExternal, as, text }: AccessibleLinkProps & { text?: string }) => {
	return (
		<Link href={href} as={as} passHref>
			<ChakraLink isExternal={isExternal}>
				{text ? capitalizeString(text) : capitalizeString(href.split('/').pop()!) ?? capitalizeString(href)}
			</ChakraLink>
		</Link>
	);
};

export default NavLink;
