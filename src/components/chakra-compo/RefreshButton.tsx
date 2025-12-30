import { IconButton } from '@chakra-ui/react';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';

type RefreshButtonProps = {
  refetch: () => Promise<any>;
  isLoading?: boolean;
  label?: string;
};

export default function RefreshButton({
  refetch,
  isLoading = false,
  label = 'Refresh',
}: RefreshButtonProps) {
  const [spinning, setSpinning] = useState(false);

  const handleClick = async () => {
    setSpinning(true);
    try {
      await refetch();
    } finally {
      setTimeout(() => setSpinning(false), 300); // smooth UX
    }
  };

  return (
    <IconButton
      aria-label={label}
      size="xs"
      variant="outline"
      disabled={isLoading || spinning}
      onClick={handleClick}
      ml={2}
    >
      <RefreshCcw
        size={14}
        style={{
          animation: spinning ? 'spin 0.6s linear infinite' : undefined,
        }}
      />
    </IconButton>
  );
}
