import { LocalizeText } from '../../../../api';
import { AutoGrid, Column, Grid, Text } from '../../../../common';

export function InventoryArmoryView() 
{
    return (
        <Grid>
            <Column size={ 7 } overflow="hidden">
                <AutoGrid columnCount={ 4 }>
          bang bang
                </AutoGrid>
            </Column>
            <Column className="justify-content-between" size={ 5 } overflow="auto">
                <Column overflow="hidden" gap={ 2 }>
                    <Text>{ LocalizeText('inventory.badges.activebadges') }</Text>
                    <AutoGrid columnCount={ 3 }>
            bang bang
                    </AutoGrid>
                </Column>
            </Column>
        </Grid>
    )
}