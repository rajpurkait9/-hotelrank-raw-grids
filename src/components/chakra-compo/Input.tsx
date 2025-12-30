import { Field, Input, InputGroup } from '@chakra-ui/react';
import { withChildren } from '../../utils/chakra-slot';
import { IMDSInputTypes } from './compo_types';

const FieldRoot = withChildren(Field.Root);
const FieldLabel = withChildren(Field.Label);
const FieldHelperText = withChildren(Field.HelperText);
const FieldErrorText = withChildren(Field.ErrorText);

const MDSInput = ({
  icon,
  value,
  onChange,
  placeholder,
  size = 'xs',
  variant = 'outline',
  width = '100%',
  label,
  helperText,
  isDisabled = false,
  required = false,
  errorText,
}: IMDSInputTypes) => {
  return (
    <FieldRoot width={width}>
      <InputGroup startElement={icon}>
        <Input
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          size={size}
          variant={variant}
          disabled={isDisabled}
          required={required}
        />
      </InputGroup>

      {errorText && <FieldErrorText fontSize="xs">{errorText}</FieldErrorText>}
      {helperText && <FieldHelperText fontSize="xs">{helperText}</FieldHelperText>}
    </FieldRoot>
  );
};

export default MDSInput;
