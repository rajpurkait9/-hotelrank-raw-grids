'use client';

import { Field, Portal, Select, createListCollection } from '@chakra-ui/react';
import { withChildren } from '../../utils/chakra-slot';
import { IMDSSelectBoxTypes } from './compo_types';

const FieldRoot = withChildren(Field.Root);
const FieldHelperText = withChildren(Field.HelperText);
const FieldErrorText = withChildren(Field.ErrorText);

const SelectRoot = withChildren(Select.Root);
const SelectLabel = withChildren(Select.Label);
const SelectControl = withChildren(Select.Control);
const SelectTrigger = withChildren(Select.Trigger);
const SelectValueText = withChildren(Select.ValueText);
const SelectIndicatorGroup = withChildren(Select.IndicatorGroup);
const SelectIndicator = withChildren(Select.Indicator);
const SelectContent = withChildren(Select.Content);
const SelectItem = withChildren(Select.Item);
const SelectItemIndicator = withChildren(Select.ItemIndicator);
const SelectHiddenSelect = withChildren(Select.HiddenSelect);
const SelectPositioner = withChildren(Select.Positioner);

const MDSSelectBox = ({
  options = [],
  label,
  value,
  onChange,
  placeholder,
  size = 'sm',
  width = '100%',
  variant = 'outline',
  helperText,
  isDisabled,
  required,
  errorText,
}: IMDSSelectBoxTypes) => {
  const collection = createListCollection({
    items: options,
  });

  return (
    <FieldRoot disabled={isDisabled} required={required}>
      <SelectRoot
        collection={collection}
        variant={variant}
        size={size}
        width={width}
        value={value ? [value] : []}
        onValueChange={(details) => onChange?.(details.value[0])}
      >
        <SelectHiddenSelect />

        {label && <SelectLabel>{label}</SelectLabel>}

        <SelectControl>
          <SelectTrigger>
            <SelectValueText placeholder={placeholder} />
          </SelectTrigger>
          <SelectIndicatorGroup>
            <SelectIndicator />
          </SelectIndicatorGroup>
        </SelectControl>

          <SelectPositioner>
            <SelectContent>
              {collection.items.map((item) => (
                <SelectItem key={item.value} item={item}>
                  {item.label}
                  <SelectItemIndicator />
                </SelectItem>
              ))}
            </SelectContent>
          </SelectPositioner>
      </SelectRoot>

      {helperText && <FieldHelperText>{helperText}</FieldHelperText>}
      {errorText && <FieldErrorText>{errorText}</FieldErrorText>}
    </FieldRoot>
  );
};

export default MDSSelectBox;
