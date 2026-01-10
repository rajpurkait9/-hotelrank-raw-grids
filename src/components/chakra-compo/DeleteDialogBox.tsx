'use client';

import { Box, Button, CloseButton, Dialog, Input, Portal, Stack, Text } from '@chakra-ui/react';
import { AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { withChildren } from '../../utils/chakra-slot';
import { ConfirmDeleteDialogProps } from './compo_types';

const DialogRoot = withChildren(Dialog.Root);
const DialogBackdrop = withChildren(Dialog.Backdrop);
const DialogPositioner = withChildren(Dialog.Positioner);
const DialogContent = withChildren(Dialog.Content);
const DialogHeader = withChildren(Dialog.Header);
const DialogBody = withChildren(Dialog.Body);
const DialogFooter = withChildren(Dialog.Footer);
const DialogTitle = withChildren(Dialog.Title);
const DialogCloseTrigger = withChildren(Dialog.CloseTrigger);

function MDSConfirmDeleteDialog({
  open,
  onClose,
  onConfirm,
  title = 'Delete Company',
  entityName,
  confirmText = 'DELETE',
  confirmLabel = 'Delete',
  isLoading = false,
}: ConfirmDeleteDialogProps) {
  const [value, setValue] = useState('');

  const isValid = value === confirmText;

  return (
    <DialogRoot
      open={open}
      placement="center"
      onOpenChange={(e) => {
        !e.open && onClose();
        setValue('');
      }}
    >
      <Portal>
        <DialogBackdrop />
        <DialogPositioner>
          <DialogContent maxW="550px">
            <DialogHeader borderBottom="1px solid" borderColor="#d3d3d3">
              <DialogTitle color="red.600">{title}</DialogTitle>
            </DialogHeader>

            <DialogBody
              p={2}
              style={{
                padding: '16px',
              }}
            >
              <Stack gap={4} borderRadius="md" p={4} bg="white">
                <Box border="1px solid" borderColor="red.200" bg="red.50" borderRadius="md" p={4}>
                  <Stack direction="row" gap={3} align="flex-start">
                    <Box color="red.600" mt="2px">
                      <AlertTriangle size={20} />
                    </Box>
                    <Box>
                      <Text fontWeight="semibold" color="red.700">
                        Are you sure?
                      </Text>
                      <Text fontSize="sm" color="red.600">
                        All the data of <b>{entityName}</b> will permanently be deleted.
                      </Text>
                    </Box>
                  </Stack>
                </Box>

                <Text fontSize="sm" color="gray.600">
                  You can’t undo this action afterwards.
                </Text>

                <Box>
                  <Text fontSize="sm" mb={2}>
                    Type <b>{confirmText}</b> to continue
                  </Text>
                  <Input
                    placeholder={`Type ${confirmText} here`}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size={'xs'}
                  />
                </Box>
              </Stack>
            </DialogBody>

            <DialogFooter
              justifyContent="flex-end"
              gap={2}
              borderTop="1px solid"
              borderColor="#d3d3d3"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  onClose();
                  setValue('');
                }}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                disabled={!isValid}
                style={{
                  backgroundColor: '#FF0000',
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

export default MDSConfirmDeleteDialog;
