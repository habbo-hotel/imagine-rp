import { FriendlyTime, HabboClubLevelEnum } from '@nitrots/nitro-renderer';
import { FC, useMemo } from 'react';
import { CreateLinkEvent, GetConfiguration, LocalizeText } from '../../api';
import { Column, Flex, Grid, LayoutCurrencyIcon, Text } from '../../common';
import { usePurse } from '../../hooks';
import { CurrencyView } from './views/CurrencyView';
import { SeasonalView } from './views/SeasonalView';

export const PurseView: FC<{}> = props => {
    const { purse = null, hcDisabled = false } = usePurse();

    const displayedCurrencies = useMemo(() => GetConfiguration<number[]>('system.currency.types', []), []);
    const currencyDisplayNumberShort = useMemo(() => GetConfiguration<boolean>('currency.display.number.short', false), []);

    const getClubText = (() => {
        if (!purse) return null;

        const totalDays = ((purse.clubPeriods * 31) + purse.clubDays);
        const minutesUntilExpiration = purse.minutesUntilExpiration;

        if (purse.clubLevel === HabboClubLevelEnum.NO_CLUB) return LocalizeText('purse.clubdays.zero.amount.text');

        else if ((minutesUntilExpiration > -1) && (minutesUntilExpiration < (60 * 24))) return FriendlyTime.shortFormat(minutesUntilExpiration * 60);

        else return FriendlyTime.shortFormat(totalDays * 86400);
    })();

    const getCurrencyElements = (offset: number, limit: number = -1, seasonal: boolean = false) => {
        if (!purse || !purse.activityPoints || !purse.activityPoints.size) return null;

        const types = Array.from(purse.activityPoints.keys()).filter(type => (displayedCurrencies.indexOf(type) >= 0));

        let count = 0;

        while (count < offset) {
            types.shift();

            count++;
        }

        count = 0;

        const elements: JSX.Element[] = [];

        for (const type of types) {
            if ((limit > -1) && (count === limit)) break;

            if (seasonal) elements.push(<SeasonalView key={type} type={type} amount={purse.activityPoints.get(type)} />);
            else elements.push(<CurrencyView key={type} type={type} amount={purse.activityPoints.get(type)} short={currencyDisplayNumberShort} />);

            count++;
        }

        return elements;
    }

    if (!purse) return null;

    return (
        <Column alignItems="end" className="nitro-purse-container" gap={1}>
            <Flex className="nitro-purse rounded-bottom p-1">
                <CurrencyView type={-1} amount={purse.credits} short={currencyDisplayNumberShort} />
                {getCurrencyElements(0, 2)}
            </Flex>
            {getCurrencyElements(2, -1, true)}
        </Column>
    );
}
