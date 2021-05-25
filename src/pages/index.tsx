import {
	Box,
	Button,
	chakra,
	Container as ChakraContainer,
	Flex,
	Heading,
	HStack,
	Stack,
	Text,
} from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { Container } from '../components/layout/Container';
import { Main } from '../components/layout/Main';
import { Link } from '../components/ui-elements/NavigationLink';
import { Routes } from '../utils/constants';
import { createUrqlClient } from '../utils/uqrlUtils';

const Index = () => {
	return (
		<Container>
			<Main>
				<ChakraContainer maxW="container.xl" centerContent>
					<Stack textAlign={'center'} align={'center'}>
						<Heading fontWeight={600} fontSize="4xl">
							Super important heading
							<Text as={'span'} px={4} colorScheme="messenger">
								made easy
							</Text>
						</Heading>
						<Text>
							Never miss a meeting. Never be late for one too. Keep track of your meetings and receive smart reminders
							in appropriate times. Read your smart “Daily Agenda” every morning.
						</Text>
						<HStack spacing={6}>
							<Button rounded={'full'} px={6}>
								Learn more
							</Button>
							<Button rounded={'full'} px={6} variant="solid" colorScheme="messenger">
								Get started
							</Button>
						</HStack>

						<Flex p={50}>
							<Flex mx={{ lg: 8 }} maxW={{ lg: '5xl' }} shadow={{ lg: 'lg' }} rounded={{ lg: 'lg' }}>
								<Box w={{ lg: '50%' }}>
									<Box
										h="full"
										rounded="lg"
										bgSize="cover"
										backgroundImage="url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80')"
									></Box>
								</Box>

								<Box pt={8} pb={4} px={4} maxW={{ base: '2xl', lg: '5xl' }} w={{ lg: '50%' }}>
									<Text fontSize={{ base: '2xl', md: '3xl' }} fontWeight="bold">
										Build Your New <chakra.span>Idea</chakra.span>
									</Text>
									<Text mt={4}>
										Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem modi reprehenderit vitae
										exercitationem aliquid dolores ullam temporibus enim expedita aperiam mollitia iure consectetur
										dicta tenetur, porro consequuntur saepe accusantium consequatur.
									</Text>

									<Box mt={8}>
										<Link href={Routes.project_create} text="start now" />
									</Box>
								</Box>
							</Flex>
						</Flex>
					</Stack>
				</ChakraContainer>
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Index);
