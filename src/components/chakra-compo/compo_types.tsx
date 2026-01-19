import { ComboboxInputProps, ComboboxRootProps, ConditionalValue } from '@chakra-ui/react';

export interface IMDSInputTypes {
  icon?: React.ReactNode;
  value?: string | number;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg' | 'xs';
  width?: string;
  variant?: ConditionalValue<'subtle' | 'outline' | 'flushed' | undefined>;
  label?: string;
  helperText?: string;
  isDisabled?: boolean;
  required?: boolean;
  errorText?: string;
  visible?: boolean;
  type?: string;

  // only for type number
  min?: number;
  max?: number;
  step?: number;
}

export interface IMDSSelectBoxTypes {
  options: { label: string; value: string }[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  size?: 'sm' | 'md' | 'lg' | 'xs';
  width?: string;
  variant?: ConditionalValue<'subtle' | 'outline' | undefined>;
  label?: string;
  helperText?: string;
  isDisabled?: boolean;
  required?: boolean;
  errorText?: string;
  visible?: boolean;
}

export interface IMDSCheckboxTypes {
  value?: boolean;
  onChange?: (value: boolean) => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  helperText?: string;
  isDisabled?: boolean;
  required?: boolean;
  errorText?: string;
}

export interface IMDSButtonTypes {
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xs';
  variant?: ConditionalValue<'subtle' | 'solid' | 'outline' | 'ghost' | 'plain'>;
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isDisabled?: boolean;
  colorScheme?:
    | 'blue'
    | 'red'
    | 'green'
    | 'yellow'
    | 'gray'
    | 'cyan'
    | 'orange'
    | 'purple'
    | string;
  loading?: boolean;
  loadingText?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'xs';
  type?: 'submit' | 'reset' | 'button';
}

export interface IMDSComboboxTypes<T> {
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  variant?: 'outline' | 'subtle';

  items?: T[];
  loading?: boolean;
  error?: boolean;
  placeholder?: string;
  helpText?: string;
  errorMessage?: string;
  value?: T | null;

  itemToString: (item: T) => string;
  itemToValue: (item: T) => string;
  renderItem: (item: T) => React.ReactNode;

  onInputChange?: (value: string) => void;
  onSelect?: (item: T) => void;

  // 🔥 SLOT PROPS
  rootProps?: Partial<ComboboxRootProps>;
  inputProps?: Partial<ComboboxInputProps>;
  controlProps?: any;
  contentProps?: any;
  itemProps?: any;

  visible?: boolean;
}

export interface ConfirmDeleteDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title?: string;
  entityName: string; // e.g. "Mahavir Enterprises"
  confirmText?: string; // default: DELETE
  confirmLabel?: string; // button text
  isLoading?: boolean;
}

// compo_types.ts
export interface ConfirmActionDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;

  icon?: React.ReactNode;
  confirmButtonColorScheme?: string;

  isLoading?: boolean;
}

export interface IMDSPinInputTypes {
  value: string;
  onChange?: (value: string) => void;

  length?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isDisabled?: boolean;

  label?: string;
  helperText?: string;
  errorText?: string;
  required?: boolean;
  visible?: boolean;
}
