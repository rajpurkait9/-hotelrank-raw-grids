import { Checkbox, HStack, Slider, Text, VStack } from '@chakra-ui/react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { withChildren } from '../../utils/chakra-slot';

const CheckboxRoot = withChildren(Checkbox.Root);
const CheckboxHiddenInput = withChildren(Checkbox.HiddenInput);
const CheckboxControl = withChildren(Checkbox.Control);

const SliderRoot = withChildren(Slider.Root);
const SliderTrack = withChildren(Slider.Track);
const SliderRange = withChildren(Slider.Range);
const SliderThumbs = withChildren(Slider.Thumbs);
const SliderControl = withChildren(Slider.Control);

const SortableFilterItem = ({ filter, onVisibilityChange, onSizeChange }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: filter.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <VStack
      ref={setNodeRef}
      style={style}
      align="stretch"
      border="1px solid"
      borderColor="gray.200"
      rounded="md"
      p={3}
      mb={3}
      bg="white"
    >
      {/* DRAG HANDLE */}
      <HStack {...attributes} {...listeners} cursor="grab" userSelect="none" gap={2}>
        <GripVertical size={16} />
        <Text fontWeight="bold" fontSize="sm">
          {filter.label || filter.id}
        </Text>
      </HStack>

      {/* VISIBILITY */}
      <HStack justify="space-between">
        <Text fontSize="sm">Visible</Text>
        <CheckboxRoot
          checked={filter.visible}
          size="sm"
          onCheckedChange={(details) => onVisibilityChange?.(filter.id, !!details.checked)}
        >
          <CheckboxHiddenInput />
          <CheckboxControl />
        </CheckboxRoot>
      </HStack>

      {/* SIZE */}
      <VStack align="stretch" gap={1}>
        <Text fontSize="sm">Size</Text>
        <SliderRoot
          min={1}
          max={5}
          step={0.5}
          value={[filter.size ?? 1]}
          onValueChange={(details) => onSizeChange?.(filter.id, details.value[0])}
        >
          <SliderControl>
            <SliderTrack>
              <SliderRange />
            </SliderTrack>
            <SliderThumbs />
          </SliderControl>
        </SliderRoot>
      </VStack>
    </VStack>
  );
};

export default SortableFilterItem;
