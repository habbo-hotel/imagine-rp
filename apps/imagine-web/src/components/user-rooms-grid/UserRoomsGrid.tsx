import { Card } from '../card/Card';
import { GridLarge } from '../grid/Grid.remix';
import React, { useEffect, useState } from 'react';
import { ButtonNoBorder } from '../button/Button.remix';
import { useRoomFetchMany } from '@imagine-cms/client';
import { UserRoomsGridProps } from './UserRoomsGrid.types';
import { RoomGridContainer } from '../room-grid-container/RoomGridContainer';
import { RoomGridContainerMock } from '../room-grid-container/RoomGridContainerMock';

const ROOMS_PAGE_SIZE = 4;

export function UserRoomsGrid({ user }: UserRoomsGridProps) {
  const [page, setPage] = useState(0);
  const fetchRooms = useRoomFetchMany();

  const canGoUp = (fetchRooms?.data?.length ?? 0) >= ROOMS_PAGE_SIZE

  const canGoDown = page > 0;

  const goUpOnePage = () => {
    if (!canGoUp) {
      return;
    }
    setPage(_ => _ + 1);
  }

  const goBackOnePage = () => {
    if (!canGoDown) {
      return;
    }
    setPage(_ => _ - 1);
  }

  useEffect(() => {
    fetchRooms.fetch({ userIDs: [user.id], skip: ROOMS_PAGE_SIZE * page, limit: ROOMS_PAGE_SIZE })
  }, [user.id, page]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0 }}>Properties</h2>
        {page > 0 && <h6 style={{ margin: 0 }}>Page {page + 1}</h6>}
      </div>
      {
        fetchRooms.data?.length === 0 && <p>You don't own any property</p>
      }
      <GridLarge>
        {
          fetchRooms.loading && (
            <>
              <RoomGridContainerMock />
            </>
          )
        }

        {
          fetchRooms.data?.map(_ => (
            <RoomGridContainer key={`my_rooms_${_.id}`} room={_} />
          ))
        }
      </GridLarge>
      <br />
      <GridLarge>
        {canGoDown ?
          <ButtonNoBorder onClick={goBackOnePage}>
            <i className={fetchRooms.loading ? 'fa fa-spinner fa-spin' : 'fa fa-arrow-left'} />
          </ButtonNoBorder>
          : <div />}
        {
          canGoUp && (
            <ButtonNoBorder onClick={goUpOnePage}>
              <i className={fetchRooms.loading ? 'fa fa-spinner fa-spin' : 'fa fa-arrow-right'} />
            </ButtonNoBorder>
          )
        }
      </GridLarge>
    </>
  )
}