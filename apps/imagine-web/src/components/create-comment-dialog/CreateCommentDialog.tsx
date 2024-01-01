import React, { ChangeEvent, useState } from 'react';
import { CreateCommentDialogProps } from './CreateCommentDialog.types';
import { Dialog } from '../dialog/Dialog';
import { Button } from '../button/Button';
import { Textarea } from '../textarea/Textarea';
import { ButtonNoBorder, ButtonSuccess } from '../button/Button.remix';

export function CreateCommentDialog({ onPostComment }: CreateCommentDialogProps) {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  function onToggle() {
    setIsOpen(_ => !_);
  }
  return (
    <>
      <Button onClick={onToggle}>New Comment</Button>
      {
        isOpen && (
          <Dialog onToggle={onToggle}>
            <Textarea value={message} onChange={setMessage} />
            <ButtonNoBorder type="button" onClick={onToggle}>Cancel</ButtonNoBorder>
            <ButtonSuccess>Post</ButtonSuccess>
            hello world
          </Dialog>
        )
      }
    </>
  )
}