import { JSX } from 'react';

export interface IFilterConfig {
  id: string;
  label: string;
  type?: 'date' | 'text' | 'select' | 'checkbox' | 'radio' | 'number';
  value: string | number | undefined | boolean;
  options?: { label: string; value: string }[];
  onChange?: (value: string | number | boolean | undefined) => void;
  visible: boolean;
  size?: 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5;
  customComponent?: JSX.Element;
  placeholder?: string;
}

export interface IMainFilterType {
  title?: JSX.Element;
  filters: IFilterConfig[];
  onVisibilityChange?: (id: string, visible: boolean) => void;
  onReorder?: (newOrder: IFilterConfig[]) => void;
  onSizeChange?: (id: string, size: number) => void;
  onClear?: () => void;
  maxToolbarUnits?: number;
  filterDrawerSize?: 'md' | 'lg' | 'sm';

  //   preset props
  pageKey?: string;
  currentFilters?: Record<string, unknown>;
  onLoadPreset?: (filters: IFilterConfig[], presetName?: string) => void;
  activePresetName?: string | null;
}

export interface IFilterDrawerProps {
  filters: IFilterConfig[];
  onVisibilityChange?: (id: string, visible: boolean) => void;
  onReorder?: (newOrder: IFilterConfig[]) => void;
  onSizeChange?: (id: string, size: number) => void;
  onClear?: () => void;
  maxToolbarUnits?: number;
  filterDrawerSize?: 'md' | 'lg' | 'sm';
  pageKey?: string;
  onLoadPreset?: (filters: IFilterConfig[], presetName?: string) => void;
  activePresetName?: string | null;
}
