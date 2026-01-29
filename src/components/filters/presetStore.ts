export interface PresetItem {
  id: string;
  name: string;
  date: string;
  values: Record<string, any>;
}

const STORAGE_PREFIX = 'FILTER_PRESETS_';

const getStorageKey = (pageKey: string) => `${STORAGE_PREFIX}${pageKey}`;

export const getPresets = (pageKey: string): PresetItem[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(getStorageKey(pageKey));
  try {
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to parse presets", e);
    return [];
  }
};

export const savePresets = (pageKey: string, items: PresetItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(getStorageKey(pageKey), JSON.stringify(items));

  // Manually dispatch event so the current window also hears the change
  window.dispatchEvent(new Event('storage_updated'));
};

export const addPreset = (pageKey: string, item: PresetItem) => {
  const current = getPresets(pageKey);
  savePresets(pageKey, [item, ...current]);
};

export const deletePreset = (pageKey: string, id: string) => {
  const next = getPresets(pageKey).filter((p) => p.id !== id);
  savePresets(pageKey, next);
};
