'use client'
import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { CreateCommentDialogProps } from './CreateCommentDialog.types';
import { Dialog } from '../dialog/Dialog';
import { Button } from '../button/Button';
import { Textarea } from '../textarea/Textarea';
import { ButtonNoBorder, ButtonSuccess } from '../button/Button.remix';
import { Form } from '../form/Form';
import { toast } from 'react-toastify';

const MIN_CHARS = 10;

export function CreateCommentDialog({ onPostComment }: CreateCommentDialogProps) {
  const [message, setMessage] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  function onToggle() {
    setIsOpen(_ => !_);
  }

  async function onSubmit(event: SyntheticEvent) {
    event.preventDefault();
    try {
      if (message.length < MIN_CHARS) {
        toast.warn(`Your message has to have more than ${MIN_CHARS} characters`);
        return;
      }
      await onPostComment(message);
      setIsOpen(false);
      toast.success('Successfully posted new comment')
    } catch (e: any) {
      toast.error('Failed to create comment due to an unexpected error');
      throw e;
    }
  }

  return (
    <>
      <Button onClick={onToggle}>New Comment</Button>
      {
        isOpen && (
          <Dialog onToggle={onToggle}>
            <Form onSubmit={onSubmit}>
              <h2>New comment</h2>
              <label>Message</label>
              <Textarea value={message} onChange={setMessage} rows={10} />
              <div style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'flex-end', gap: 16 }}>
                <ButtonNoBorder type="button" onClick={onToggle}>Cancel</ButtonNoBorder>
                <ButtonSuccess type="submit">Post</ButtonSuccess>
              </div>
            </Form>
          </Dialog>
        )
      }
    </>
  )
}