import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { FC } from 'react';
import { sentenceCaseString } from '../utils/constants';
import { InputFieldProps } from '../utils/props';

export const InputField: FC<InputFieldProps> = ({ type, label, ...props }) => {
	const [fieldProps, { error }] = useField(props.name);

	return (
		<FormControl isInvalid={!!error} /* casting to boolean */>
			<FormLabel htmlFor={fieldProps.name}>
				{label ? sentenceCaseString(fieldProps.name.replace(/([A-Z][a-z])/g, ' $1')) : ''}
			</FormLabel>
			<Input
				{...fieldProps}
				{...props}
				id={fieldProps.name}
				type={type}
				value={fieldProps.value}
				placeholder={props.placeholder ? sentenceCaseString(fieldProps.name.replace(/([A-Z][a-z])/g, ' $1')) : ''}
			/>
			{error && <FormErrorMessage>{error}</FormErrorMessage>}
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
