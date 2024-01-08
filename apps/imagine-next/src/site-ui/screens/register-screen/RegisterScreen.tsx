import { Form } from '../../components/form/Form';
import { Input } from '../../components/input/Input';
import { Button } from '../../components/button/Button';
import { ButtonBrand } from '../../components/button/Button.remix';
'use client'
import React, { SyntheticEvent, useContext, useState } from 'react';
import { GuestContainer } from '../../components/guest-container/GuestContainer';
import { configContext, localStorageService, sessionContext } from '@imagine-cms/web';
import { UserCreateInput, UserGender, useUserCreate, useUserFetchOne } from '@imagine-cms/client';
import { toast } from 'react-toastify';
import { ACTION_NAVIGATE } from 'next/navigation';
import Link from 'next/link';

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
      ACTION_NAVIGATE('/me');
    } catch (e: any) {
      toast.error(`Failed to create user`);
      throw e;
    }
  }


  return (
    <GuestContainer>
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
        <div style={{ display: 'flex', flex: 1, gap: 16, justifyContent: 'flex-end' }}>
          <Link href="/login">
            <ButtonBrand>Login</ButtonBrand>
          </Link>
          <Button className="btn btn-primary btn-block" disabled={!canCreateUser} type="submit">
            {
              createUser.loading ? <><i className="fa fa-spinner fa-spin" style={{ marginRight: 4 }} /> Joining...</> : 'Join now'
            }
          </Button>
        </div>
      </Form>
    </GuestContainer>
  )
}
