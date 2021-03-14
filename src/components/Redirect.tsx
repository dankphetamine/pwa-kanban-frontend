import { Text } from '@chakra-ui/layout';
import redirect from 'nextjs-redirect';

export const Redirect = (url: string) => {
	const Redirect = redirect(url);
	return (
		<Redirect>
			<Text>Redirecting...</Text>
		</Redirect>
	);
};
