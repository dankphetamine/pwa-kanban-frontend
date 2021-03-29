import { CheckIcon } from '@chakra-ui/icons';
import { Box, Container as ChakraContainer, Heading, HStack, SimpleGrid, Stack, Text, VStack } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { Container } from 'next/app';
import { Main } from '../components/Main';
import { createUrqlClient } from '../utils/uqrlUtils';

const Index = () => {
	const features = [...new Array(8)].map((_, i) => ({
		id: i,
		title: 'Lorem ipsum dolor sit amet',
		text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam.',
	}));

	return (
		<Container>
			<Main>
				<ChakraContainer maxW="container.xl" centerContent>
					<Box p={4}>
						<Stack spacing={4} maxW={'3xl'} textAlign={'center'}>
							<Heading fontSize={'3xl'}>This is the headline</Heading>
							<Text color={'gray.600'} fontSize={'xl'}>
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
								labore et dolore magna aliquyam erat, sed diam voluptua.
							</Text>
						</Stack>

						<ChakraContainer maxW={'6xl'} mt={10}>
							<SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
								{features.map(feature => (
									<HStack key={feature.id} align={'top'}>
										<Box color={'green.400'} px={2}>
											<CheckIcon />
										</Box>
										<VStack align={'start'}>
											<Text fontWeight={600}>{feature.title}</Text>
											<Text color={'gray.600'}>{feature.text}</Text>
										</VStack>
									</HStack>
								))}
							</SimpleGrid>
						</ChakraContainer>
					</Box>
				</ChakraContainer>
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(Index);
