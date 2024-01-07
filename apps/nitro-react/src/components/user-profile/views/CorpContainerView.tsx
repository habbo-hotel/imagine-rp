import React from 'react';
import { Column, Text } from '../../../common';

export function CorpContainerView() 
{
    return (
        <Column gap={ 1 }>
            <Text small>
                <b>My Job</b>
                <p>I don't have a job</p>
            </Text>
        </Column>
    )
}