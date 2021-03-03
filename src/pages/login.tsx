import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { Container } from '../components/Container';
import { InputField } from '../components/InputField';
import { useLoginMutation } from '../graphql/generated/graphql';

const Register = () => {
	const [, login] = useLoginMutation();
	const router = useRouter();

	return (
		<Container height="100vh">
			<Flex minH={'100vh'} align={'center'} justify={'center'}>
				<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
					<Heading fontSize={'5xl'}>Log into account</Heading>
					<Box rounded={'lg'} boxShadow={'dark-lg'} p={8}>
						<Formik
							initialValues={{ email: '', password: '' }}
							onSubmit={async (values, actions) => {
								if (!values.email.trim().length) return actions.setErrors({ email: 'Email must be included' });

								if (!values.password.trim().length) return actions.setErrors({ password: 'Password must be included' });

								const response = await login(values);
								if (response.error) actions.setErrors({ email: response.error.message });
								else router.push('/');
							}}
						>
							{({ isSubmitting }) => (
								<Form>
									<Stack spacing={4}>
										<InputField name="email" type="email" />
										<InputField name="password" type="password" />
										<Button type="submit" isLoading={isSubmitting} variant="solid">
											Login
										</Button>
									</Stack>
								</Form>
							)}
						</Formik>
					</Box>
				</Stack>
			</Flex>
		</Container>
	);
};

export default Register;