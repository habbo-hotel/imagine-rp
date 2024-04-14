
'use client'
import { toast } from 'react-toastify';
import { Form } from '../../components/form/Form';
import { Input } from '../../components/input/Input';
import React, { SyntheticEvent, useState } from 'react';
import { ButtonBrand } from '../../components/button/Button.remix';
import { useForgotPasswordRequestCreate } from '@imagine-cms/client';
import { GuestContainer } from '../../components/guest-container/GuestContainer';
import { redirect } from 'next/navigation'
import Link from 'next/link';

export function ForgotPasswordScreen() {
  const [username, setUsername] = useState('');
  const forgotPasswordRequestCreate = useForgotPasswordRequestCreate();

  const isDisabled = !username;

  const onSubmitPasswordReset = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await forgotPasswordRequestCreate.execute({ username });
      toast.success('Check your email for instructions on how to reset your password!');
      redirect('/forgot-password/confirmation');
    } catch (e: any) {
      toast.error('There was a problem resetting your password');
    }
  }

  return (
    <GuestContainer>
      <Link href="/login">
        <i className="fa fa-caret-left fa-3x" />
      </Link>
      <h1>reset password</h1>
      <Form disabled={isDisabled} onSubmit={onSubmitPasswordReset}>
        <label>Username</label>
        <Input type="text" value={username} onChange={e => setUsername(e.currentTarget.value ?? '')} />
        <div style={{ display: 'flex', flex: 1, justifyContent: 'flex-end' }}>
          <ButtonBrand disabled={isDisabled} type="submit">Send Code</ButtonBrand>
        </div>
      </Form>
    </GuestContainer>
  )
}