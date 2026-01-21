import { Spinner, Text } from '@chakra-ui/react';
import { Trash, View } from 'lucide-react';
import { useEffect, useState } from 'react';
import MDSConfirmActionDialog from './components/chakra-compo/ConfirmDialogBox';
import MDSConfirmDeleteDialog from './components/chakra-compo/DeleteDialogBox';
import { DataTable } from './components/DataTable';
import { IFilterConfig } from './components/filters';
import FiltersToolBar from './components/filters/Filters';
import { loadOrder, saveOrder } from './components/filters/reorderStore';
import { dummyData } from './dummy/data';

const headers = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'User Name' },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role' },
];

function App() {
  const [pageSize, setPageSize] = useState(20);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false); // [id, ]
  const [activePresetName, setActivePresetName] = useState<string | null>(null);

  const [filters, setFilters] = useState<IFilterConfig[]>([
    {
      id: 'search input',
      visible: true,
      label: 'Search',
      // value: '',
      value: '',
      onChange: (v: string | number | boolean | undefined) => {
        // onSearchChange(v as string);
        updateFilterValue('search input', v);
      },
      size: 2.5,
      type: 'text',
    },
    {
      id: 'checkbox',
      visible: false,
      label: 'Checkbox',
      value: '',
      onChange: (v: boolean | undefined | number | string) => updateFilterValue('checkbox', v),
      size: 1,
      type: 'checkbox',
    },
    {
      id: 'DateRange',
      visible: true,
      label: 'Date Range',
      value: '',
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
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
      ],
    },
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

      <DataTable
        data={dummyData.map((item, i) => ({
          ...item,
          id: item.id + i,
          __raw: item,
          __key: item.id,
        }))}
        pageSize={pageSize}
        tableId="onslldj"
        loading={false}
        // skeletonLoading
        loadingChildren={<Spinner size={'sm'} />}
        page={page}
        totalCount={dummyData.length}
        onPageChange={(page) => setPage(page)}
        onPageSizeChange={(pageSize) => setPageSize(pageSize)}
        headers={headers}
        key={'something'}
        pageSizeOptions={[5, 8, 10]}
        onRowSelect={(row) => console.log('click')}
        onRowSelectEvent="left"
        actions={[
          {
            icon: <View size={14} />,
            label: 'Confirm',
            onClick: () => setOpenConfirm(true),
            colorScheme: 'blue',
            // visible: true,
          },
          {
            icon: <Trash size={14} />,
            label: 'Delete',
            onClick: () => setOpen(true),
            colorScheme: 'red',
            visible: (row) => row.__key % 2 === 0,
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
      <MDSConfirmActionDialog
        open={openConfirm}
        onClose={() => setOpenConfirm(false)}
        onConfirm={() => setOpenConfirm(false)}
        title="Confirm Action"
        description="Are you sure you want to continue?"
        confirmLabel="Confirm"
        cancelLabel="Cancel"
        isLoading={false}
      />
    </div>
  );
}

export default App;
