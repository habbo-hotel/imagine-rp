import React from 'react';
import { createPortal } from 'react-dom';
import { DialogProps } from './Dialog.types';
import { DialogBackdrop, DialogContainer } from './Dialog.styled';

export function Dialog({ children, onToggle }: DialogProps) {
  return (
    <DialogBackdrop onClick={onToggle}>
      {
        createPortal((
          <DialogContainer onClick={e => e.stopPropagation()}>
            {children}
          </DialogContainer>
        ), document.body)
      }
    </DialogBackdrop>
  );
};
