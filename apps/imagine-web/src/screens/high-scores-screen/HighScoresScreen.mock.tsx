import React from 'react';
import { SmallUserProfileContainerMock } from '../../components/small-user-profile-container/SmallUserProfileContainerMock';

export const HIGH_SCORE_USERS_MOCK = Array(6).fill(null).map((_, i) => <SmallUserProfileContainerMock key={`user_high_score_mock_${i}`} />)