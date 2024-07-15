import { useCallback } from 'react';
import MicroModal from 'micromodal';

export const useHook = (id: string, onCloseFunction: () => void) => {
  const open = useCallback(() => {
    MicroModal.show(id, {
      disableScroll: true,
      awaitCloseAnimation: true,
      awaitOpenAnimation: true,
      onClose: onCloseFunction,
    });
  }, [id]);

  const close = useCallback(() => {
    MicroModal.close(id);
  }, [id]);

  return { open,
close };
};
