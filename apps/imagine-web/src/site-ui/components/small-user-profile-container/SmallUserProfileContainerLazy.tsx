import React, { useEffect } from 'react';
import { useUserFetchOne } from '@imagine-cms/client';
import { SmallUserProfileContainer } from './SmallUserProfileContainer';
import { SmallUserProfileContainerMock } from './SmallUserProfileContainerMock';
import { SmallUserProfileContainerProps } from './SmallUserProfileContainer.types';

export function SmallUserProfileContainerLazy({ userID, ...props }: { userID: number } & Partial<SmallUserProfileContainerProps>) {
  const fetchUser = useUserFetchOne();
  const onFetchUser = async () => {
    fetchUser.fetch({ id: userID });
  }
  useEffect(() => {
    onFetchUser();
  }, [userID]);

  if (fetchUser.error) {
    return (
      <SmallUserProfileContainerMock {...props} />
    )
  }

  if (!fetchUser.data) {
    return <SmallUserProfileContainerMock  {...props} />
  }

  return <SmallUserProfileContainer user={fetchUser.data as any}   {...props} />
}