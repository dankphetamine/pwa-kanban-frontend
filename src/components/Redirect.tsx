import redirect from 'nextjs-redirect';
import { Routes } from '../utils/constants';

export const Redirect = (url: string) => {
	const Redirect = redirect(Routes[url] ?? Routes.home);
	return <Redirect />;
};
