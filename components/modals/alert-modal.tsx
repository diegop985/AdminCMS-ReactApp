'use client';

import React, { useEffect, useState } from 'react';
import { Modal } from '../ui/modal';
import { Button } from '../ui/button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
  elementToDelete?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
  elementToDelete,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Modal
        title={`Do you want to delete this ${
          elementToDelete ? elementToDelete : 'store'
        }?`}
        description='This action cannot be undone.'
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className='pt-6 space-x-6 flex items-center justify-end w-full'>
          <Button
            variant='outline'
            disabled={isLoading}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            disabled={isLoading}
            onClick={onConfirm}
          >
            Confirm
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AlertModal;
