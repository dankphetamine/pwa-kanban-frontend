import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { FC } from 'react';
import { InputFieldProps } from '../utils/props';
import { capitalizeString } from '../utils/text';

export const InputField: FC<InputFieldProps> = ({ type, label, ...props }) => {
	const [fieldProps, { error }] = useField(props.name);

	return (
		<FormControl isInvalid={!!error} /* casting to boolean */>
			<FormLabel htmlFor={fieldProps.name}>
				{label ? capitalizeString(fieldProps.name.replace(/([A-Z][a-z])/g, ' $1')) : ''}
			</FormLabel>
			<Input
				{...fieldProps}
				{...props}
				id={fieldProps.name}
				type={type}
				value={fieldProps.value}
				placeholder={props.placeholder ? capitalizeString(fieldProps.name.replace(/([A-Z][a-z])/g, ' $1')) : ''}
			/>
			<FormErrorMessage>{error ?? null}</FormErrorMessage>
		</FormControl>
	);
};

InputField.propTypes = {
	placeholder: PropTypes.bool.isRequired,
	label: PropTypes.bool.isRequired,
	name: PropTypes.string.isRequired,
	type: PropTypes.string,
	value: PropTypes.string,
};

InputField.defaultProps = {
	label: true,
	placeholder: true,
	type: 'text',
};
