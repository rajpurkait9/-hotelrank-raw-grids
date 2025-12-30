import { Button, HStack } from '@chakra-ui/react';
import { IMDSButtonTypes } from './compo_types';

const MDSButton = ({
  onClick,
  size = 'sm',
  variant = 'solid',
  label,
  leftIcon,
  rightIcon,
  isDisabled,
  colorScheme,
  loading,
  loadingText,
  rounded,
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
