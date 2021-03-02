import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { ColorModeSwitch } from '../components/ColorModeSwitch';
import { Container } from '../components/Container';
import { InputField } from '../components/InputField';

const Register = () => (
	<Container height="100vh">
		<Flex minH={'100vh'} align={'center'} justify={'center'}>
			<Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
				<Heading fontSize={'5xl'}>Register account</Heading>
				<Box rounded={'lg'} boxShadow={'dark-lg'} p={8}>
					<Formik
						initialValues={{ email: '', password: '' }}
						onSubmit={values => {
							console.log(values.email);
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

export default Register;
