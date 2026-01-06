import { Combobox, HStack, Span, Spinner, useListCollection } from '@chakra-ui/react';
import { useEffect, useMemo, useState } from 'react';
import { withChildren } from '../../utils/chakra-slot';
import type { IMDSComboboxTypes } from './compo_types';

const ComboboxRoot = withChildren(Combobox.Root);
const ComboboxLabel = withChildren(Combobox.Label);
const ComboboxControl = withChildren(Combobox.Control);
const ComboboxInput = withChildren(Combobox.Input);
const ComboboxIndicatorGroup = withChildren(Combobox.IndicatorGroup);
const ComboboxClearTrigger = withChildren(Combobox.ClearTrigger);
const ComboboxTrigger = withChildren(Combobox.Trigger);
const ComboboxPositioner = withChildren(Combobox.Positioner);
const ComboboxContent = withChildren(Combobox.Content);

export default function MDSCombobox<T>({
  label,
  size = 'sm',
  width = '100%',
  variant = 'outline',

  items = [],
  itemToString,
  itemToValue,
  renderItem,

  loading,
  error,
  placeholder,

  onInputChange,
  onSelect,

  // 🔑 SLOT PROPS
  rootProps,
  inputProps,
  controlProps,
  contentProps,
  itemProps,
}: IMDSComboboxTypes<T>) {
  const [inputValue, setInputValue] = useState('');
  const { collection, set } = useListCollection<T>({
    initialItems: items,
    itemToString,
    itemToValue,
  });

  const filteredItems = useMemo(() => {
    if (!inputValue) return items;

    const query = inputValue.toLowerCase();

    return items.filter((item) => itemToString(item).toLowerCase().includes(query));
  }, [items, inputValue, itemToString]);

  useEffect(() => {
    set(filteredItems);
  }, [filteredItems, set]);

  return (
    <ComboboxRoot
      width={width}
      size={size}
      variant={variant}
      collection={collection}
      placeholder={placeholder}
      onInputValueChange={(e) => {
        onInputChange?.(e.inputValue);
        setInputValue(e.inputValue);
      }}
      onValueChange={(e) => {
        const value = e.value?.[0];
        if (!value) return;

        const selected = collection.items.find((item) => itemToValue(item) === value);

        if (selected) {
          onSelect?.(selected);
        }
      }}
      positioning={{ sameWidth: false, placement: 'bottom-start' }}
      {...rootProps}
    >
      {label && <ComboboxLabel>{label}</ComboboxLabel>}

      <ComboboxControl {...controlProps}>
        <ComboboxInput placeholder={placeholder ?? 'Type to search'} {...inputProps} />
        <ComboboxIndicatorGroup>
          <ComboboxClearTrigger />
          <ComboboxTrigger />
        </ComboboxIndicatorGroup>
      </ComboboxControl>

      <ComboboxPositioner>
        <ComboboxContent minW="sm" {...contentProps}>
          {loading ? (
            <HStack p="2">
              <Spinner size="xs" borderWidth="1px" />
              <Span>Loading...</Span>
            </HStack>
          ) : error ? (
            <Span p="2" color="fg.error">
              Error fetching
            </Span>
          ) : (
            collection.items.map((item) => (
              <Combobox.Item key={itemToValue(item)} item={item} {...itemProps}>
                {renderItem(item)}
                <Combobox.ItemIndicator />
              </Combobox.Item>
            ))
          )}
        </ComboboxContent>
      </ComboboxPositioner>
    </ComboboxRoot>
  );
}
