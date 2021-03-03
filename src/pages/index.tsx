import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons';
import { Code, Link as ChakraLink, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import { ColorModeSwitch } from '../components/ColorModeSwitch';
import { Container } from '../components/Container';
import { CTA } from '../components/CTA';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Main } from '../components/Main';

const Index = () => (
	<Container height="100vh">
		<Header />
		<Main>
			<Text>
				Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> + <Code>typescript</Code>.
			</Text>

			<List spacing={3} my={0}>
				<ListItem>
					<ListIcon as={CheckCircleIcon} color="green.500" />
					<ChakraLink isExternal href="https://chakra-ui.com" flexGrow={1} mr={2}>
						Chakra UI <LinkIcon />
					</ChakraLink>
				</ListItem>
				<ListItem>
					<ListIcon as={CheckCircleIcon} color="green.500" />
					<ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
						Next.js <LinkIcon />
					</ChakraLink>
				</ListItem>
			</List>
		</Main>

		<ColorModeSwitch />
		<Footer>
			<Text>Next ❤️ Chakra</Text>
		</Footer>
		<CTA />
	</Container>
);

export default Index;