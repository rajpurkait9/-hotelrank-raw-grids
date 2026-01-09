'use client';

import { Box, Button, CloseButton, Dialog, Portal, Stack, Text } from '@chakra-ui/react';
import { AlertTriangle } from 'lucide-react';
import { withChildren } from '../../utils/chakra-slot';
import { ConfirmActionDialogProps } from './compo_types';

const DialogRoot = withChildren(Dialog.Root);
const DialogBackdrop = withChildren(Dialog.Backdrop);
const DialogPositioner = withChildren(Dialog.Positioner);
const DialogContent = withChildren(Dialog.Content);
const DialogHeader = withChildren(Dialog.Header);
const DialogBody = withChildren(Dialog.Body);
const DialogFooter = withChildren(Dialog.Footer);
const DialogTitle = withChildren(Dialog.Title);
const DialogCloseTrigger = withChildren(Dialog.CloseTrigger);

function MDSConfirmActionDialog({
  open,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  description = 'Are you sure you want to continue?',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  icon,
  isLoading = false,
  confirmButtonColorScheme = '#4169e1',
}: ConfirmActionDialogProps) {
  return (
    <DialogRoot open={open} placement="center" onOpenChange={(e) => !e.open && onClose()}>
      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent maxW="480px">
            <DialogHeader borderBottom="1px solid" borderColor="gray.200">
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>

            <DialogBody p={6}>
              <Stack gap={4} align="center" textAlign="center">
                <Box color="orange.500">{icon ?? <AlertTriangle size={40} />}</Box>

                <Text fontSize="sm" color="gray.600">
                  {description}
                </Text>
              </Stack>
            </DialogBody>

            <DialogFooter
              justifyContent="flex-end"
              gap={2}
              borderTop="1px solid"
              borderColor="gray.200"
            >
              <Button variant="outline" size="sm" onClick={onClose}>
                {cancelLabel}
              </Button>

              <Button
                size="sm"
                style={{
                  backgroundColor: confirmButtonColorScheme,
                }}
                loading={isLoading}
                onClick={onConfirm}
              >
                {confirmLabel}
              </Button>
            </DialogFooter>

            <DialogCloseTrigger asChild>
              <CloseButton size="sm" />
            </DialogCloseTrigger>
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
}

export default MDSConfirmActionDialog;
