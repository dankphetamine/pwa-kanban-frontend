import { Box, Button, SimpleGrid, SkeletonText, VStack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/dist/client/router';
import React from 'react';
import { Container } from '../../components/Container';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { Main } from '../../components/Main';
import { Redirect } from '../../components/Redirect';
import { useCreateProjectMutation, useCurrentUserQuery } from '../../graphql/generated/graphql';
import { Routes } from '../../utils/constants';
import { createUrqlClient } from '../../utils/uqrlUtils';

const CreateNewProject = () => {
	const [{ data, fetching }] = useCurrentUserQuery();
	const router = useRouter();
	const [, createProject] = useCreateProjectMutation();

	if (!fetching && !data?.currentUser) return Redirect('/');

	return (
		<Container>
			<Main>
				{fetching && (
					<Box padding="6" boxShadow="lg">
						<SkeletonText noOfLines={24} spacing={4} />
					</Box>
				)}
				{!fetching && data?.currentUser && (
					<>
						<Header title={'Create a new project'} />
						<Box rounded={'lg'} boxShadow={'dark-lg'} p={8}>
							<Formik
								initialValues={{ name: '', description: '' }}
								onSubmit={async (values, actions) => {
									const response = await createProject(values);

									if (response.error) actions.setErrors({});
									else router.push(Routes.projects);
								}}
							>
								{({ isSubmitting }) => (
									<Form>
										<VStack spacing={4}>
											<InputField name="name" />
											<InputField name="description" />
											<Button type="submit" isLoading={isSubmitting} variant="solid">
												Create
											</Button>
											<SimpleGrid></SimpleGrid>
										</VStack>
									</Form>
								)}
							</Formik>
						</Box>
					</>
				)}
			</Main>
		</Container>
	);
};

export default withUrqlClient(createUrqlClient)(CreateNewProject);
