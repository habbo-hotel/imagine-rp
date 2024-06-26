'use client'
import { Form } from '../../components/form/Form';
import { Input } from '../../components/input/Input';
import { Button } from '../../components/button/Button';
import { ButtonBrand } from '../../components/button/Button.remix';
import React, { SyntheticEvent, useContext, useState } from 'react';
import { GuestContainer } from '../../components/guest-container/GuestContainer';
import { GuestGuard, configContext, localStorageService, sessionContext } from '@imagine-cms/web';
import { UserCreateInput, UserGender, useUserCreate, useUserFetchOne } from '@imagine-cms/client';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { SiteLogo } from '../../components/site-logo/SiteLogo';

export function RegisterScreen() {
  const createUser = useUserCreate();
  const fetchUser = useUserFetchOne();
  const { config } = useContext(configContext);
  const { setSession } = useContext(sessionContext);
  const [userCreateInput, setUserCreateInput] = useState<UserCreateInput>({
    username: '',
    email: '',
    password: '',
    gender: UserGender.Male,
    betaCode: '',
  })


  const betaCodeRequirementsMet = config?.betaCodesRequired ? !!userCreateInput.betaCode : true;

  const isLoading = createUser.loading;

  const canCreateUser = userCreateInput.email !== '' && userCreateInput.username !== '' && userCreateInput.password !== '' && betaCodeRequirementsMet && !isLoading;

  function onChanges(changes: Partial<UserCreateInput>) {
    setUserCreateInput(_ => ({
      ..._,
      ...changes,
    }))
  }

  async function onCreateUser(event: SyntheticEvent) {
    event.preventDefault();
    try {
      const newSession = await createUser.execute(userCreateInput)
      localStorageService.set('SESSION', newSession.accessToken);
      const matchingUser = await fetchUser.fetch({ id: newSession.userID });
      setSession(matchingUser as any);
      toast.success(`Welcome back, ${matchingUser.username}`)
      redirect('/me');
    } catch (e: any) {
      toast.error(`Failed to create user`);
      throw e;
    }
  }

  return (
    <GuestGuard>
      <SiteLogo />
      <h1>create account</h1>
      <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <Form onSubmit={onCreateUser}>
          <label>Username</label>
          <Input type="text" name="username" value={userCreateInput.username} onChange={e => onChanges({ username: e.currentTarget?.value ?? '' })} placeholder="Username" />
          <label>Email</label>
          <Input type="text" name="email" value={userCreateInput.email} onChange={e => onChanges({ email: e.currentTarget?.value ?? '' })} placeholder="Email" />
          <label>Password</label>
          <Input type="password" name="password" value={userCreateInput.password} onChange={e => onChanges({ password: e.currentTarget?.value ?? '' })} placeholder="Password" id="password" />
          {
            config?.betaCodesRequired && (
              <>

                <label>Beta Code</label>
                <Input type="text" name="betaCode" value={userCreateInput.betaCode} onChange={e => onChanges({ betaCode: e.currentTarget?.value ?? '' })} placeholder="Beta Code" />
              </>
            )
          }
          <div style={{ display: 'flex', flex: 1, gap: 16, justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/login">
              Already have an account?
            </Link>
            <div style={{ display: 'flex', flex: 1, gap: 16, justifyContent: 'flex-end' }}>
              <ButtonBrand type="submit" disabled={!canCreateUser}>Enter the city</ButtonBrand>
            </div>
          </div>
        </Form>
      </div>
    </GuestGuard>
  )
}
