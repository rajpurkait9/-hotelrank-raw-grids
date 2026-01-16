import { Field, HStack, PinInput } from '@chakra-ui/react';
import { withChildren } from '../../utils/chakra-slot';
import { IMDSPinInputTypes } from './compo_types';

const FieldRoot = withChildren(Field.Root);
const FieldLabel = withChildren(Field.Label);
const FieldHelperText = withChildren(Field.HelperText);
const FieldErrorText = withChildren(Field.ErrorText);
const PinInputInput = withChildren(PinInput.Input);
const PinInputControl = withChildren(PinInput.Control);
const PinInputHiddenInput = withChildren(PinInput.HiddenInput);
const PinInputRoot = withChildren(PinInput.Root);

const MDSPinInput = ({
  value,
  onChange,
  length = 4,
  size = 'xs',
  isDisabled = false,
  label,
  helperText,
  errorText,
  required = false,
  visible = true,
}: IMDSPinInputTypes) => {
  // Convert string → string[]
  const valueArray = Array.from({ length }).map((_, i) => value?.[i] ?? '');

  return (
    <FieldRoot>
      {visible && label && (
        <FieldLabel>
          {label}
          {required && ' *'}
        </FieldLabel>
      )}

      <PinInputRoot
        value={valueArray}
        onValueChange={(e) => onChange?.(e.value.join(''))}
        disabled={isDisabled}
        size={size}
      >
        <PinInputHiddenInput />

        <PinInputControl>
          <HStack>
            {Array.from({ length }).map((_, index) => (
              <PinInputInput key={index} index={index} />
            ))}
          </HStack>
        </PinInputControl>
      </PinInputRoot>

      {errorText && <FieldErrorText fontSize="xs">{errorText}</FieldErrorText>}

      {helperText && !errorText && <FieldHelperText fontSize="xs">{helperText}</FieldHelperText>}
    </FieldRoot>
  );
};

export default MDSPinInput;
