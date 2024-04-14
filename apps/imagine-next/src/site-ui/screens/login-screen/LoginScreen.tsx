
'use client'
import Link from 'next/Link';
import { toast } from 'react-toastify';
import { Form } from '../../components/form/Form';
import { Input } from '../../components/input/Input';
import React, { SyntheticEvent, useState } from 'react';
import { GuestGuard, useSignInWithUsernameAndPassword } from '@imagine-cms/web';
import { ButtonBrand, ButtonClear } from '../../components/button/Button.remix';
import { SiteLogo } from '../../components/site-logo/SiteLogo';

export function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { tryLogin } = useSignInWithUsernameAndPassword(username, password);

  const onLogin = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!username || !password) {
      toast.error('You must provide a username and password');
    }
    tryLogin();
  }

  return (
    <GuestGuard>
      <h1>sign in</h1>
      <Form onSubmit={onLogin}>
        <label>Username</label>
        <Input type="text" name="username" placeholder="Username" value={username} onChange={e => setUsername(e.currentTarget.value ?? '')} />
        <label>Password</label>
        <Input type="password" name="password" placeholder="Password" required value={password} onChange={(e: any) => setPassword(e?.currentTarget?.value ?? '')} />
        <div style={{ display: 'flex', flex: 1, gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/forgot-password">
            Forgot Password?
          </Link>
          <div style={{ display: 'flex', flex: 1, gap: 16, justifyContent: 'flex-end' }}>
            <Link href="/register">
              <ButtonClear type="button">Create Account</ButtonClear>
            </Link>
            <ButtonBrand type="submit">Sign In</ButtonBrand>
          </div>
        </div>
      </Form>
    </GuestGuard>
  )
}
