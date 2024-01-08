'use client'
import { usePhotoFetchOne } from '@imagine-cms/client';
import React, { useEffect } from 'react';
import { PhotoViewScreenImagePreview } from './PhotoViewScreen.styled';
import { PhotoCommentsCard } from './photo-comments-card/PhotoCommentsCard';
import { SmallUserProfileContainer } from '../../components/small-user-profile-container/SmallUserProfileContainer';
import { SmallUserProfileContainerMock } from '../../components/small-user-profile-container/SmallUserProfileContainerMock';
import { GridLarge } from '../../components/grid/Grid.remix';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export function PhotoViewScreen() {
  const params = useParams<{ photoID: string }>();
  const photoID = Number(params!.photoID);

  const fetchPhoto = usePhotoFetchOne();

  useEffect(() => {
    fetchPhoto.fetch({ id: photoID })
  }, [photoID]);


  return (
    <>
      <h1><Link href="/photos"><i className="fa fa-caret-left" style={{ marginRight: 8 }} /></Link>Photos - #{photoID}</h1>
      <br />
      {
        fetchPhoto.data && (
          <GridLarge>
            <div>
              <PhotoViewScreenImagePreview src={fetchPhoto.data.photoURL} />
              <h2>Meet the author</h2>
              <div style={{ display: 'flex', width: 'fit-content' }}>
                {fetchPhoto.data.user ? <SmallUserProfileContainer user={fetchPhoto.data.user as any} showMotto={false} showRank={false} /> : <SmallUserProfileContainerMock showMotto={false} showRank={false} />}
              </div>
            </div>
            <PhotoCommentsCard photo={fetchPhoto.data} />
          </GridLarge>
        )
      }
    </>
  )
}