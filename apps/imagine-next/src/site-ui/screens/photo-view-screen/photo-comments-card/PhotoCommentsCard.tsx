'use client'
import React, { useEffect, useMemo } from 'react';
import { Card } from '../../../components/card/Card';
import { usePhotoCommentCreate, usePhotoCommentFetchMany } from '@imagine-cms/client';
import { PhotoCommentsCardProps } from './PhotoCommentsCard.types';
import { CommentContainer } from '../../../components/comment-container/CommentContainer';
import { CreateCommentDialog } from '../../../components/create-comment-dialog/CreateCommentDialog';
import { toast } from 'react-toastify';

export function PhotoCommentsCard({ photo }: PhotoCommentsCardProps) {
  const photoCommentCreate = usePhotoCommentCreate();
  const photoCommentFetch = usePhotoCommentFetchMany();

  async function refresh() {
    await photoCommentFetch.fetch({ photoIDs: [photo.id] })
  }

  async function onPostComment(message: string) {
    try {
      await photoCommentCreate.execute({ photoID: photo.id, comment: message });
      await refresh();
      toast.success(`Successfully posted new comment on photo #{photo.id}`)
    } catch (e: any) {
      toast.error(`Failed to post comment due to an unexpected error`)
      throw e;
    }
  }

  useEffect(() => {
    refresh();
  }, [photo.id]);

  const header = useMemo(() => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div>Comments ({photoCommentFetch.data?.length ?? 0})</div>
        <CreateCommentDialog onPostComment={onPostComment} />
      </div>
    )
  }, [photoCommentFetch.data?.length]);

  return (
    <Card header={header} style={{ height: '100%' }}>
      {
        photoCommentFetch.loading && (
          <i className="fa fa-spinner fa-spin" />
        )
      }
      <div style={{ maxHeight: 450, overflowY: 'scroll' }}>
        {
          photoCommentFetch.data?.map(_ => (
            <CommentContainer key={`comment_${_.id}`} id={_.id} comment={_.comment} user={_.user} />
          ))
        }
      </div>
    </Card>
  )
}