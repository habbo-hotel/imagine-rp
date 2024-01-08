'use client'
import React from 'react';
import { ArticleCreateInputDTO } from '@imagine-cms/types';
import { ArticleEditorCard } from '../../components/article-editor-card/ArticleEditorCard';
import Link from 'next/link';

export function NewsArticlesCreateArticleScreen() {

  const onCreateArticle = async (input: ArticleCreateInputDTO) => {

  }

  return (
    <>
      <h1>
        <Link href="/articles">
          <i className="fa fa-caret-left" style={{ marginRight: 8 }} />
        </Link>
        News Articles - Creating Article
      </h1>
      <ArticleEditorCard onSave={onCreateArticle} />
    </>
  )
}