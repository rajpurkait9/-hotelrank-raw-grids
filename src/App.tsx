import { Text } from '@chakra-ui/react';
import { Edit, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import MDSConfirmDeleteDialog from './components/chakra-compo/DeleteDialogBox';
import { DataTable } from './components/DataTable';
import { IFilterConfig } from './components/filters';
import { FiltersToolBar } from './components/filters/Filters';
import { loadOrder, saveOrder } from './components/filters/reorderStore';
import { dummyData } from './dummy/data';

const headers = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'User Name', backgroundColor: 'orange.400' },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role' },
];

function App() {
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);

  const [filters, setFilters] = useState<IFilterConfig[]>([
    {
      id: 'DateRange',
      visible: true,
      label: 'Date Range',
      value: undefined,
      onChange: (v: string | number | boolean | undefined) => updateFilterValue('DateRange', v),
      size: 2.5,
      type: 'date',
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
        { label: 'Option 1', value: '1' },
        { label: 'Option 2', value: '2' },
        { label: 'Option 3', value: '3' },
      ],
    },

    {
      id: 'checkbox-2',
      // customComponent: <DemoCheckbox />,
      visible: true,
      label: 'Checkbox',
      value: '',
      onChange: (v: boolean | undefined | number | string) => updateFilterValue('checkbox', v),
      size: 1.5,
      type: 'checkbox',
    },

    {
      id: 'search input',
      visible: true,
      label: 'Search',
      value: '',
      onChange: (v: string | number | boolean | undefined) => updateFilterValue('search input', v),
      size: 1.5,
      type: 'text',
    },
  ]);

  function updateFilterValue(id: string, value: any) {
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, value } : f)));
  }

  function handleVisibility(id: string, visible: boolean) {
    setFilters((prev) => prev.map((f) => (f.id === id ? { ...f, visible } : f)));
  }

  function handleSize(id: string, size: number) {
    console.log({ id, size });
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

  const activeFilterState = filters.reduce((obj, f) => {
    obj[f.id] = f.value;
    return obj;
  }, {} as Record<string, any>);

  useEffect(() => {
    const order = loadOrder('demo');
    if (!order.length) return;

    setFilters((prev) => {
      const map = Object.fromEntries(prev.map((f) => [f.id, f]));
      return order.map((id) => map[id]).filter(Boolean);
    });
  }, []);

  return (
    <div
      style={{
        border: '1px solid red',
        height: '100vh',
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <FiltersToolBar
        title={<Text color={'red'}>Filters</Text>}
        filters={filters}
        onVisibilityChange={handleVisibility}
        onReorder={(reordered) => {
          saveOrder(
            'demo',
            reordered.map((f) => f.id),
          );
          setFilters(reordered);
        }}
        onSizeChange={handleSize}
        onClear={handleClear}
        maxToolbarUnits={5}
        pageKey="demo"
        currentFilters={activeFilterState}
        onLoadPreset={(filters, name) => {
          console.log('Loaded preset:', name, filters);
        }}
        activePresetName={null}
      />

      <DataTable
        data={dummyData}
        pageSize={pageSize}
        tableId="onslldj"
        // loading={true}
        // skeletonLoading
        page={page}
        totalCount={dummyData.length}
        onPageChange={(page) => setPage(page)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
        headers={headers}
        key={'something'}
        actions={[
          {
            icon: <Edit size={14} />,
            label: 'Edit',
            onClick: () => console.log('Edit'),
            colorScheme: 'blue',
          },
          {
            icon: <Trash size={14} />,
            label: 'Delete',
            onClick: () => setOpen(true),
            colorScheme: 'red',
          },
        ]}
      />

      <MDSConfirmDeleteDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => setOpen(false)}
        title="Delete Company"
        entityName="Company"
        confirmText="DELETE"
        confirmLabel="Delete"
        isLoading={false}
      />
    </div>
  );
}

export default App;
