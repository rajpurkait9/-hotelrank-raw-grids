// presetStore.ts
import { Store } from '@tanstack/store';

export interface PresetItem {
  id: string;
  name: string;
  date: string;
  values: Record<string, any>; // 👈 filterId → value
}

type PresetState = Record<string, PresetItem[]>;

const storageKey = (pageKey = 'default') => `FILTER_PRESETS_${pageKey}`;

const safeParse = (value: string | null): PresetItem[] => {
  if (!value) return [];
  try {
    return JSON.parse(value);
  } catch {
    return [];
  }
};

const loadInitial = (pageKey: string): PresetItem[] => {
  if (typeof window === 'undefined') return [];
  return safeParse(localStorage.getItem(storageKey(pageKey)));
};

export const presetStore = new Store<PresetState>({});

/**
 * Get presets for a page.
 * Loads once from localStorage and caches in store.
 */
export const getPresets = (pageKey: string): PresetItem[] => {
  const state = presetStore.state;

  if (pageKey in state) {
    return state[pageKey];
  }

  const loaded = loadInitial(pageKey);

  presetStore.setState((prev) => ({
    ...prev,
    [pageKey]: loaded,
  }));

  return loaded;
};

export const savePresets = (pageKey: string, items: PresetItem[]) => {
  presetStore.setState((prev) => ({
    ...prev,
    [pageKey]: items,
  }));

  if (typeof window !== 'undefined') {
    localStorage.setItem(storageKey(pageKey), JSON.stringify(items));
  }
};

export const addPreset = (pageKey: string, item: PresetItem) => {
  const next = [item, ...getPresets(pageKey)];
  savePresets(pageKey, next);
};

export const deletePreset = (pageKey: string, id: string) => {
  const next = getPresets(pageKey).filter((p) => p.id !== id);
  savePresets(pageKey, next);
};

export const updatePreset = (
  pageKey: string,
  id: string,
  updater: (preset: PresetItem) => PresetItem,
) => {
  const next = getPresets(pageKey).map((p) =>
    p.id === id ? updater(p) : p,
  );
  savePresets(pageKey, next);
};
