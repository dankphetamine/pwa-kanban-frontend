import redirect from 'nextjs-redirect';
import PropTypes from 'prop-types';
import { Routes } from '../utils/constants';

export const Redirect = (url?: string) => {
	const Redirect = redirect(Routes[url || 'home'] ?? Routes.home);
	return <Redirect />;
};

Redirect.propTypes = {
	url: PropTypes.string,
};

Redirect.defaultProps = {
	url: Routes.home,
};
