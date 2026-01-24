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
  textColor = 'white',
  borderColor,
}: IMDSButtonTypes) => {
  return (
    <Button
      onClick={onClick}
      size={size}
      variant={variant}
      disabled={isDisabled}
      loading={loading}
      loadingText={loadingText}
      rounded={rounded}
      type={type}
      background={colorScheme}
      color={textColor}
      border={borderColor}
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
