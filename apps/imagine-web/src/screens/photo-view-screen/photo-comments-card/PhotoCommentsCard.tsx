import React, { useEffect, useMemo } from 'react';
import { Card } from '../../../components/card/Card';
import { usePhotoCommentCreate, usePhotoCommentFetchMany } from '@imagine-cms/client';
import { PhotoCommentsCardProps } from './PhotoCommentsCard.types';
import { CommentContainer } from '../../../components/comment-container/CommentContainer';
import { CreateCommentDialog } from '../../../components/create-comment-dialog/CreateCommentDialog';
import { toast } from 'react-toastify';

export function PhotoCommentsCard({ photo }: PhotoCommentsCardProps) {
  const photoCommentCreate = usePhotoCommentCreate();
  const { data, fetch, loading } = usePhotoCommentFetchMany();

  async function onPostComment(message: string) {
    try {
      await photoCommentCreate.execute({ photoID: photo.id, comment: message });
      toast.success(`Successfully posted new comment on photo #{photo.id}`)
    } catch (e: any) {
      toast.error(`Failed to post comment due to an unexpected error`)
      throw e;
    }
  }

  useEffect(() => {
    fetch({ photoIDs: [photo.id] });
  }, [photo.id]);

  const header = useMemo(() => {
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <div>Comments ({data?.length ?? 0})</div>
        <CreateCommentDialog onPostComment={onPostComment} />
      </div>
    )
  }, [data?.length]);

  return (
    <Card header={header} style={{ height: '100%' }}>
      {
        loading && (
          <i className="fa fa-spinner fa-spin" />
        )
      }
      <div style={{ maxHeight: 450, overflowY: 'scroll' }}>
        {
          data?.map(_ => (
            <CommentContainer key={`comment_${_.id}`} id={_.id} comment={_.comment} user={_.user} />
          ))
        }
      </div>
    </Card>
  )
}