'use client';

import { Button, CloseButton, Dialog, Flex, Portal } from '@chakra-ui/react';
import React, { ReactNode } from 'react';
import { MDSRefreshButton } from '../..';
import { withChildren } from '../../utils/chakra-slot';

/* ───────── Slot Components ───────── */

type SlotProps = { children: ReactNode };

export const MDSDialogBody: React.FC<SlotProps> = ({ children }) => <>{children}</>;
export const MDSDialogActions: React.FC<SlotProps> = ({ children }) => <>{children}</>;
export const MDSDialogAction = Button;

/* ───────── Chakra Slots ───────── */

const DialogRoot = withChildren(Dialog.Root);
const DialogBackdrop = withChildren(Dialog.Backdrop);
const DialogPositioner = withChildren(Dialog.Positioner);
const DialogContent = withChildren(Dialog.Content);
const DialogHeader = withChildren(Dialog.Header);
const DialogBody = withChildren(Dialog.Body);
const DialogFooter = withChildren(Dialog.Footer);
const DialogTitle = withChildren(Dialog.Title);
const DialogCloseTrigger = withChildren(Dialog.CloseTrigger);

/* ───────── Slot Extractor ───────── */

function extractSlots(children: ReactNode) {
  let body: ReactNode | null = null;
  let actions: ReactNode | null = null;

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement<SlotProps>(child)) return;

    if (child.type === MDSDialogBody) {
      body = child.props.children;
    }

    if (child.type === MDSDialogActions) {
      actions = child.props.children;
    }
  });

  return { body, actions };
}

/* ───────── Wrapper ───────── */

export interface MDSDialogWrapperProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  width?: string;
  position?: string;
  refetch?: () => Promise<any>;
  loading?: boolean;
}

const MDSDialogWrapper = ({
  open,
  onClose,
  title,
  children,
  width,
  position,
  refetch,
  loading = false,
}: MDSDialogWrapperProps) => {
  const { body, actions } = extractSlots(children);

  return (
    <DialogRoot
      open={open}
      onOpenChange={(e) => !e.open && onClose()}
      placement={position ?? 'center'}
    >
      <Portal>
        <DialogBackdrop bg="blackAlpha.400" />

        <DialogPositioner>
          <DialogContent
            w={width ?? '560px'}
            maxW={width ?? '560px'}
            borderRadius="6px"
            overflow="hidden"
            boxShadow="lg"
          >
            <DialogHeader
              px="20px"
              py="16px"
              bg="white"
              borderBottom="1px solid"
              borderColor="gray.200"
            >
              <Flex align="center" justify="space-between">
                <DialogTitle fontSize="16px" fontWeight="600">
                  {title}
                </DialogTitle>

                <DialogCloseTrigger asChild>
                  <CloseButton size="sm" />
                </DialogCloseTrigger>
                {refetch && (
                  <MDSRefreshButton label="Refresh" refetch={refetch} isLoading={loading} />
                )}
              </Flex>
            </DialogHeader>

            {body && (
              <DialogBody px="20px" py="16px" bg="#F8FAFC" type="submit">
                <Flex direction="column" gap="16px">
                  {body}
                </Flex>
              </DialogBody>
            )}

            {actions && (
              <DialogFooter
                px="20px"
                py="16px"
                bg="white"
                borderTop="1px solid"
                borderColor="gray.200"
              >
                <Flex ml="auto" gap="12px">
                  {actions}
                </Flex>
              </DialogFooter>
            )}
          </DialogContent>
        </DialogPositioner>
      </Portal>
    </DialogRoot>
  );
};

export default MDSDialogWrapper;
