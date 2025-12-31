import { Button, HStack } from '@chakra-ui/react';
import { IMDSButtonTypes } from './compo_types';

const MDSButton = ({
  onClick,
  size = 'xs',
  variant = 'solid',
  label,
  leftIcon,
  rightIcon,
  isDisabled,
  colorScheme,
  loading,
  loadingText,
  rounded,
  type = 'button',
}: IMDSButtonTypes) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      variant={variant}
      disabled={isDisabled}
      colorPalette={colorScheme}
      loading={loading}
      loadingText={loadingText}
      rounded={rounded}
      type={type}
    >
      <HStack gap={1}>
        {leftIcon}
        {label}
        {rightIcon}
      </HStack>
    </Button>
  );
};

export default MDSButton;
