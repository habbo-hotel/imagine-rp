'use client'
import React, { useMemo } from 'react';
import { Card } from '../../blocks/card/Card';
import { ButtonPrimary } from '../../blocks/button/Button.remix';
import { ArticlesTableLazy } from '../../components/articles-table/ArticlesTable.lazy';
import Link from 'next/link';

export function NewsArticlesOverviewScreen() {

  const cardHeader = useMemo(() => (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <h1>News Articles</h1>
      <Link
        href="/articles/create">
        <ButtonPrimary>
          <i className="fa fa-plus-circle" />&nbsp; New Article
        </ButtonPrimary>
      </Link>
    </div>
  ), []);

  return (
    <>
      <Card header={cardHeader} style={{ height: '100%' }}>
        <ArticlesTableLazy />
      </Card>
    </>
  )
}
