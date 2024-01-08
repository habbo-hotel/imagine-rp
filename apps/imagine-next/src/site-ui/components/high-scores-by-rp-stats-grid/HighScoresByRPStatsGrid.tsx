'use client'
import React, { useEffect, useState } from 'react';
import { HighScoresByRPStatsGridProps } from './HighScoresByRPStatsGrid.types';
import { Grid } from '../grid/Grid';
import { useRPStatsFetchMany } from '@imagine-cms/client';
import { SmallUserProfileContainerMock } from '../small-user-profile-container/SmallUserProfileContainerMock';
import { SmallUserProfileContainerLazy } from '../small-user-profile-container/SmallUserProfileContainerLazy';
import { GridLarge } from '../grid/Grid.remix';
import { ButtonNoBorder } from '../button/Button.remix';

const HIGH_SCORES_PAGE_SIZE = 4;

export function HighScoresByRPStatsGrid({ children, orderBy }: HighScoresByRPStatsGridProps) {
  const [page, setPage] = useState(0);
  const rpStatsFetchMany = useRPStatsFetchMany();

  const canGoDown = page > 0;
  const canGoUp = (rpStatsFetchMany?.data?.length ?? 0) >= HIGH_SCORES_PAGE_SIZE;

  function goBackOnePage() {
    if (!canGoDown) {
      return;
    }
    setPage(_ => _ - 1)
  };
  function goUpOnePage() {
    if (!canGoUp) {
      return;
    }
    setPage(_ => _ + 1);
  }

  async function refresh() {
    await rpStatsFetchMany.fetch({ orderBy, skip: page & HIGH_SCORES_PAGE_SIZE, limit: HIGH_SCORES_PAGE_SIZE });
  }

  useEffect(() => {
    refresh();
  }, [orderBy, page]);

  return (
    <div style={{ width: '100%' }}>
      <Grid>
        {
          rpStatsFetchMany.loading && (
            <SmallUserProfileContainerMock showMothref={false} showRank={false}>
              -
              {children}
            </SmallUserProfileContainerMock>
          )
        }
        {
          rpStatsFetchMany.data?.map((_, i) => {
            const leaderboardRanking = (i + 1) + (page * HIGH_SCORES_PAGE_SIZE);
            return (
              <SmallUserProfileContainerLazy userID={_.userID} showMothref={false} showRank={false}>
                <div>
                  <div>
                    {_[orderBy]}&nbsp;{children}
                  </div>
                  <b>#{leaderboardRanking}</b>
                </div>
              </SmallUserProfileContainerLazy>
            )
          })
        }
      </Grid>
      <br />
      <GridLarge>
        {canGoDown ?
          <ButtonNoBorder onClick={goBackOnePage}>
            <i className={rpStatsFetchMany.loading ? 'fa fa-spinner fa-spin' : 'fa fa-arrow-left'} />
          </ButtonNoBorder>
          : <div />}
        {
          canGoUp && (
            <ButtonNoBorder onClick={goUpOnePage}>
              <i className={rpStatsFetchMany.loading ? 'fa fa-spinner fa-spin' : 'fa fa-arrow-right'} />
            </ButtonNoBorder>
          )
        }
      </GridLarge>
    </div>
  )
}