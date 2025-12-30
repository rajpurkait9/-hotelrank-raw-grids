import { ConditionalValue } from '@chakra-ui/react';

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
  colorScheme?: 'blue' | 'red' | 'green' | 'yellow' | 'gray' | 'cyan' | 'orange' | 'purple';
  loading?: boolean;
  loadingText?: string;
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
