'use client';

import {
  Button,
  Checkbox,
  CloseButton,
  Drawer,
  HStack,
  IconButton,
  Portal,
  Slider,
  Tabs,
  Text,
  VStack,
} from '@chakra-ui/react';

import { Edit, Eye, Filter } from 'lucide-react';
import { withChildren } from '../../utils/chakra-slot';
import { IFilterDrawerProps } from './FilterTypes';

const DrawerRoot = withChildren(Drawer.Root);
const DrawerTrigger = withChildren(Drawer.Trigger);
const DrawerBackdrop = withChildren(Drawer.Backdrop);
const DrawerPositioner = withChildren(Drawer.Positioner);
const DrawerContent = withChildren(Drawer.Content);
const DrawerHeader = withChildren(Drawer.Header);
const DrawerTitle = withChildren(Drawer.Title);
const DrawerBody = withChildren(Drawer.Body);
const DrawerFooter = withChildren(Drawer.Footer);
const DrawerCloseTrigger = withChildren(Drawer.CloseTrigger);

export const FiltersDrawer = ({
  filterDrawerSize = 'sm',
  onVisibilityChange,
  onReorder,
  onSizeChange,
  onClear,
  maxToolbarUnits,
  filters,
}: IFilterDrawerProps) => {
  return (
    <HStack wrap="wrap">
      <DrawerRoot size={filterDrawerSize}>
        <DrawerTrigger asChild>
          <IconButton aria-label="Open filters" variant="outline" size="xs" ml={2} p={2}>
            <Filter size={16} />
            Filters
          </IconButton>
        </DrawerTrigger>

        <Portal>
          <DrawerBackdrop />
          <DrawerPositioner>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Filters</DrawerTitle>
              </DrawerHeader>

              <DrawerBody overflowY="auto" pt={1}>
                <Tabs.Root defaultValue="view">
                  <Tabs.List mb={4}>
                    <Tabs.Trigger value="view">
                      <Eye size={16} />
                      View
                    </Tabs.Trigger>

                    <Tabs.Trigger value="edit">
                      <Edit size={16} />
                      Edit
                    </Tabs.Trigger>
                  </Tabs.List>

                  {/* VIEW MODE */}
                  <Tabs.Content value="view">
                    {filters
                      .filter((f) => f.visible)
                      .map((f) => (
                        <VStack
                          key={f.id}
                          align="stretch"
                          border="1px solid"
                          borderColor="gray.200"
                          rounded="md"
                          p={3}
                          mb={3}
                        >
                          <Text fontWeight="bold">{f.label}</Text>
                          {f.customComponent}
                        </VStack>
                      ))}
                  </Tabs.Content>

                  {/* EDIT MODE */}
                  <Tabs.Content value="edit">
                    {filters.map((f, i) => (
                      <VStack
                        key={f.id}
                        align="stretch"
                        border="1px solid"
                        borderColor="gray.200"
                        rounded="md"
                        p={3}
                        mb={3}
                      >
                        <Text fontWeight="bold">{f.label}</Text>

                        {/* VISIBLE */}
                        <HStack justify="space-between">
                          <Text fontSize="sm">Visible</Text>
                          <Checkbox.Root
                            checked={f.visible}
                            onCheckedChange={(val) =>
                              onVisibilityChange && onVisibilityChange(f.id, true)
                            }
                            size="sm"
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control />
                            {/* {/* <Checkbox.Label>Accept terms and conditions</Checkbox.Label> */}
                          </Checkbox.Root>
                        </HStack>

                        {/* SIZE */}
                        <VStack align="stretch" gap={1}>
                          <Text fontSize="sm">Size</Text>
                          <Slider.Root
                            width="200px"
                            min={0.5}
                            max={5}
                            step={0.5}
                            value={[f.size ?? 1]}
                            onChange={(val) => onSizeChange && onSizeChange(f.id, val[0])}
                          >
                            <Slider.Control>
                              <Slider.Track>
                                <Slider.Range />
                              </Slider.Track>
                              <Slider.Thumbs />
                            </Slider.Control>
                          </Slider.Root>
                        </VStack>
                      </VStack>
                    ))}
                  </Tabs.Content>
                </Tabs.Root>
              </DrawerBody>

              {/* <Divider my={3} /> */}

              <DrawerFooter justify="space-between">
                <Button
                  size="sm"
                  variant="ghost"
                  colorScheme="red"
                  onClick={() => onClear && onClear()}
                >
                  Clear All
                </Button>
                <DrawerCloseTrigger asChild>
                  <CloseButton />
                </DrawerCloseTrigger>
              </DrawerFooter>
            </DrawerContent>
          </DrawerPositioner>
        </Portal>
      </DrawerRoot>
    </HStack>
  );
};

export default FiltersDrawer;
