import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ColumnState {
  visibility: Record<string, Record<string, boolean>>;
  order: Record<string, string[]>;
}

interface ColumnStore extends ColumnState {
  toggleColumn: (pageKey: string, columnId: string) => void;
  setColumnOrder: (pageKey: string, order: string[]) => void;
  getVisibility: (pageKey: string, columnId: string) => boolean;
  getOrder: (pageKey: string, defaultOrder: string[]) => string[];
}

export const useColumnStore = create<ColumnStore>()(
  persist(
    (set, get) => ({
      visibility: {},
      order: {},

      toggleColumn: (pageKey, columnId) =>
        set((state) => ({
          visibility: {
            ...state.visibility,
            [pageKey]: {
              ... (state.visibility[pageKey] || {}),
              [columnId]: !(state.visibility[pageKey]?.[columnId] ?? true),
            },
          },
        })),

      setColumnOrder: (pageKey, order) =>
        set((state) => ({
          order: {
            ...state.order,
            [pageKey]: order,
          },
        })),

      getVisibility: (pageKey, columnId) => {
        return get().visibility[pageKey]?.[columnId] ?? true;
      },

      getOrder: (pageKey, defaultOrder) => {
        return get().order[pageKey] || defaultOrder;
      },
    }),
    {
      name: "chakra-data-table-column-state",
    }
  )
);
