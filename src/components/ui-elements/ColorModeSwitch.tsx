import { Switch, useColorMode } from '@chakra-ui/react';

export const ColorModeSwitch = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === 'dark';
	return (
		<Switch position="fixed" top="6rem" right="2rem" color="inherit" isChecked={isDark} onChange={toggleColorMode} />
	);
};
