import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { IFilterConfig } from './components/filters';
import FiltersToolBar from './components/filters/Filters';
import { loadOrder, saveOrder } from './components/filters/reorderStore';

type HeaderProps = {
  search: string;
  onSearchChange: (search: string) => void;
};

export const DemoFilter = ({ search, onSearchChange }: HeaderProps) => {
  const [filters, setFilters] = useState<IFilterConfig[]>([
    {
      id: 'search input',
      visible: true,
      label: 'Search',
      value: search,
      onChange: (v: string | number | boolean | undefined) => {
        onSearchChange(v as string);
        updateFilterValue('search input', v);
      },
      size: 2.5,
      type: 'text',
    },
    {
      id: 'checkbox',
      visible: true,
      label: 'Checkbox',
      value: '',
      onChange: (v: boolean | undefined | number | string) => updateFilterValue('checkbox', v),
      size: 1,
      type: 'checkbox',
    },

    {
      id: 'select',
      visible: true,
      label: 'Select Box',
      value: '',
      onChange: (v: string | number | boolean | undefined) => updateFilterValue('select', v),
      size: 1.5,
      type: 'select',
      options: [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],
    },
    {
      id: 'Date',
      visible: true,
      label: 'Date Picker',
      value: '',
      onChange: (v: string | number | boolean | undefined) => updateFilterValue('Date', v),
      size: 2.5,
      type: 'date',
    },
    // {
    //   id: 'DateRange',
    //   visible: true,
    //   label: 'Date Range',
    //   value: '',
    //   onChange: (v: string | number | boolean | undefined) => updateFilterValue('DateRange', v),
    //   size: 2.5,
    //   type: 'date-range',
    // },
  ]);

  function updateFilterValue(id: string, value: any) {
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)));
  }

  function handleVisibility(id: string, visible: boolean) {
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, visible } : f)));
  }

  function handleSize(id: string, size: number) {
    type UpdatedFilter = IFilterConfig & { size: number };

    setFilters((prev: IFilterConfig[]) =>
      prev.map((f) => (f.id === id ? ({ ...f, size } as UpdatedFilter) : f)),
    );
  }

  function handleClear() {
    setFilters((prev) =>
      prev.map((f) => ({
        ...f,
        value: '',
      })),
    );
  }

  const activeFilterState = filters.reduce(
    (obj, f) => {
      obj[f.id] = f.value;
      return obj;
    },
    {} as Record<string, any>,
  );

  useEffect(() => {
    const order = loadOrder('demo');
    if (!order.length) return;

    setFilters((prev) => {
      const map = Object.fromEntries(prev.map((f) => [f.id, f]));
      return order.map((id) => map[id]).filter(Boolean);
    });
  }, []);

  return (
    <FiltersToolBar
      title={
        <Text>
          <b>District Price History</b>
        </Text>
      }
      filters={filters}
      onVisibilityChange={handleVisibility}
      onReorder={(reordered) => {
        saveOrder(
          'district-price-history-filter',
          reordered.map((f) => f.id),
        );
        setFilters(reordered);
      }}
      onSizeChange={handleSize}
      pageKey="district-price-history-filter"
      // not in use
      onClear={handleClear}
      maxToolbarUnits={5}
      currentFilters={activeFilterState}
      onLoadPreset={(filters, name) => {
        console.log('Loaded preset:', name, filters);
      }}
      activePresetName={null}
    />
  );
};
