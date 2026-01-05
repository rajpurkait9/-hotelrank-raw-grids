# 🧩 MDS DataTable

A **headless-friendly, Chakra-styled, TanStack-powered data table** built for **real admin panels**, not toy demos.

This table is designed for **production dashboards** where you need:

* stable layouts
* column control
* client/server pagination
* loading + skeleton states
* drag-reorderable headers
* zero dependency on heavy table engines

> Built with **React, Chakra UI, TanStack Store, DnD Kit**.

---

## ✨ Features

### Core

* ✅ Fully typed (`<DataTable<T>>`)
* ✅ Client & server pagination
* ✅ Column sorting (asc / desc)
* ✅ Persistent column order (per table)
* ✅ Column visibility toggle
* ✅ Action column support
* ✅ Sticky headers
* ✅ Density control (`sm | md | lg`)

### UX & States

* ✅ Centered loading spinner (table-safe)
* ✅ Skeleton rows (layout-accurate)
* ✅ Empty state handling
* ✅ No layout jump during loading
* ✅ Header always visible

### Advanced

* 🔁 Drag & drop column reordering
* 💾 Column order persisted via `localStorage`
* 🧠 Derived selectors (no duplicated logic)
* 🧱 Table-aware skeletons (not fake divs)
* ⚡ Powered by `@tanstack/store` (lightweight & fast)

---

## 🧱 Architecture

This table **does not rely on heavy table engines**.

Instead:

* **Store** → holds raw state
* **Selectors** → derive visible/sorted columns
* **Components** → render only what they should

This keeps:

* logic reusable
* rendering predictable
* performance stable on large datasets

---

## 📦 Installation

```bash
npm install @chakra-ui/react @tanstack/react-store @dnd-kit/core @dnd-kit/sortable
```

> Chakra UI is required.
> This library is designed to **embrace Chakra**, not fight it.

---

## 🚀 Basic Usage

```tsx
<DataTable
  tableId="users-table"
  headers={headers}
  data={data}
  page={page}
  pageSize={pageSize}
  totalCount={data.length}
  onPageChange={setPage}
  onPageSizeChange={setPageSize}
/>
```

---

## 🧩 Column Definition

```ts
const headers = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'User Name', backgroundColor: 'orange.400' },
  { id: 'email', label: 'Email' },
  { id: 'role', label: 'Role' },
];
```

### Supported column features

* alignment
* background color
* custom formatters
* sortable toggle
* width control

---

## ⚙️ Actions Column

```tsx
actions={[
  {
    icon: <Edit size={14} />,
    label: 'Edit',
    onClick: (row) => console.log(row),
    colorScheme: 'blue',
  },
  {
    icon: <Trash size={14} />,
    label: 'Delete',
    onClick: () => setOpen(true),
    colorScheme: 'red',
  },
]}
```

✔ Sticky
✔ Optional
✔ Fully configurable

---

## ⏳ Loading States

### Blocking loading (spinner)

```tsx
<DataTable
  loading
  loadingChildren={<Spinner size="sm" />}
/>
```

* Spinner is **perfectly centered**
* Header remains visible
* Pagination remains stable

---

### Skeleton loading (background fetch)

```tsx
<DataTable
  skeletonLoading
/>
```

* Skeleton rows align with real columns
* Uses `<Table.Row>` / `<Table.Cell>`
* No layout mismatch

---

## 📭 Empty State

```tsx
<DataTable
  data={[]}
  emptyMessage="No records found"
/>
```

Centered, accessible, and table-safe.

---

## 🔄 Pagination Modes

### Client-side

```ts
paginationMode="client"
```

### Server-side

```ts
paginationMode="server"
```

You fully control data fetching.

---

## 🧠 Filters Integration (Optional)

The table plays nicely with external toolbars:

* reorderable filters
* saved presets
* controlled visibility
* size-aware layout

Example shown using `FiltersToolBar`.

---

## 🧪 Types (Fully Typed)

```ts
DataTableProps<T>
Column<T>
DataTableAction<T>
ActionHeaderProps
```

Everything is typed.
No `any` leaks.
No guessing.

---

## 🎯 Design Philosophy

This table is built for:

* admin panels
* analytics dashboards
* internal tools
* B2B SaaS products

**Not** for:

* marketing pages
* static lists
* low-control UI kits

---

## 🛣 Roadmap

* [ ] Column resizing
* [ ] Row selection
* [ ] Virtualized rows
* [ ] Export (CSV / Excel)
* [ ] Preset column layouts
* [ ] Server-side sorting helpers

---

## 🧑‍💻 Author

Built by **Raj Purkait**
Full-stack engineer focused on **performance-first UI systems**.

---

## 📄 License

MIT — free, open-source, forever.

---

If you want, next I can:

* tighten this README for npm
* add architecture diagrams
* write contribution guidelines
* extract this into a mono-repo-ready package

Just say the word.
