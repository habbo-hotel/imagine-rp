'use client'
import React from 'react';
import { createPortal } from 'react-dom';
import { DialogProps } from './Dialog.types';
import { DialogBackdrop, DialogContainer, DialogContent } from './Dialog.styled';

export function Dialog({ children, onToggle }: DialogProps) {
  return (
    <>
      <div id="dialog-ref">&nbsp;</div>
      <DialogBackdrop onClick={onToggle} />
      <DialogContainer onClick={onToggle} >
        <DialogContent onClick={e => e.stopPropagation()}>

          {children}
        </DialogContent>
      </DialogContainer>
    </>
  );
};
