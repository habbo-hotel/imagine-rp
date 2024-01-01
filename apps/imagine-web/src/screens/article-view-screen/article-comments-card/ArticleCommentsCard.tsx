import React, { useEffect } from 'react';
import { Card } from '../../../components/card/Card';
import { useArticleCommentFetchMany } from '@imagine-cms/client';
import { ArticleCommentsCardProps } from './ArticleCommentsCard.types';
import { ArticleCommentsCardHeader } from './ArticleCommentsCard.styled';
import { CommentContainer } from '../../../components/comment-container/CommentContainer';
import { CreateCommentDialog } from '../../../components/create-comment-dialog/CreateCommentDialog';

export function ArticleCommentsCard({ articleID }: ArticleCommentsCardProps) {
  const articleCommentFetch = useArticleCommentFetchMany();

  async function refresh() {
    await articleCommentFetch.fetch({ articleIDs: [articleID] });
  }


  useEffect(() => {
    refresh();
  }, [articleID]);

  return (
    <Card>
      <ArticleCommentsCardHeader>
        <h1>Comments ({articleCommentFetch.data?.length ?? 0})</h1>
        <CreateCommentDialog articleID={articleID} onChanges={refresh} />
      </ArticleCommentsCardHeader>
      {
        (articleCommentFetch.data?.length ?? 0) === 0 && <p>No comments found, be the first!</p>
      }
      <div style={{ maxHeight: 275, overflowY: 'scroll' }}>
        {
          articleCommentFetch.data?.map(articleComment => (

            <CommentContainer id={articleComment.id} comment={articleComment.comment} user={articleComment.user} key={`article_${articleID}_comment_${articleComment.id}`} />
          ))
        }
      </div>
    </Card>
  )
}
