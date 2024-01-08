'use client'
import React, { useEffect } from 'react';
import { useArticleFetchOne } from '@imagine-cms/client';
import { GridLargeSmall } from '../../components/grid/Grid.remix';
import { ArticleCommentsCard } from './article-comments-card/ArticleCommentsCard';
import { LongUserContainer } from '../../components/long-user-container/LongUserContainer';
import { ArticleContentContainer, ArticleContentElement, ArticleHeaderBackground, ArticleHeaderContainer, ArticleHeaderContent, ArticleHeaderOverlay } from './ArticleViewScreen.styled';

export function ArticleViewScreen() {
  const fetchArticle = useArticleFetchOne();
  const [_, params] = useRoute<{ articleID: string }>('/articles/:articleID');
  const articleID = Number(params!.articleID);

  useEffect(() => {
    fetchArticle.fetch({ id: articleID });
  }, [articleID]);

  return (
    <>
      <ArticleHeaderContainer>
        <ArticleHeaderBackground src={fetchArticle.data?.imageURL} />
        <ArticleHeaderOverlay />
        <ArticleHeaderContent>
          <h1>{fetchArticle.data?.name}</h1>
          <p>{fetchArticle.data?.description}</p>
        </ArticleHeaderContent>
      </ArticleHeaderContainer >
      <br />
      <GridLargeSmall>
        <ArticleContentElement>
          <ArticleContentContainer>
            <div style={{ height: '100%' }}>
              <div dangerouslySetInnerHTML={{ __html: fetchArticle.data?.content ?? '' }} />
            </div>
            {fetchArticle.data?.user && <LongUserContainer user={fetchArticle.data.user as any} />}
          </ArticleContentContainer>
        </ArticleContentElement>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', gap: 16 }}>
          <ArticleCommentsCard articleID={articleID} />
        </div>
      </GridLargeSmall>
    </>
  )
}
