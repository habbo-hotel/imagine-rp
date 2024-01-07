import React from 'react';
import { Column, Text } from '../../../common';

export function GangContainerView() 
{
    return (
        <Column gap={ 1 }>
            <Text small>
                <b>My Gang</b>
                <p>I don't belong to a gang</p>
            </Text>
        </Column>
    )
}