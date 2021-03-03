import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { useRouter } from 'next/dist/client/router';
import { ColorModeSwitch } from '../components/ColorModeSwitch';
import { Container } from '../components/Container';
import { InputField } from '../components/InputField';
import { useRegisterMutation } from '../graphql/generated/graphql';

const Register = () => {
	const [, register] = useRegisterMutation();
	const router = useRouter();

	return (
		<Container height="100vh">
			<Flex minH={'100vh'} align={'center'} justify={'center'}>
				<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
					<Heading fontSize={'5xl'}>Register account</Heading>
					<Box rounded={'lg'} boxShadow={'dark-lg'} p={8}>
						<Formik
							initialValues={{ email: '', password: '' }}
							onSubmit={async (values, actions) => {
								const response = await register(values);
								if (response.error) actions.setErrors({ email: response.error.message });
								else router.push('/login');
							}}
						>
							{({ isSubmitting }) => (
								<Form>
									<Stack spacing={4}>
										<InputField name="email" type="email" />
										<InputField name="password" type="password" />
										<Button type="submit" isLoading={isSubmitting} variant="solid">
											Register
										</Button>
									</Stack>
								</Form>
							)}
						</Formik>
					</Box>
				</Stack>
			</Flex>

			<ColorModeSwitch />
		</Container>
	);
};

export default Register;
