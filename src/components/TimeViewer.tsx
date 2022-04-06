import moment from 'moment-timezone';
import styled from 'styled-components';
import HorizontalStack from './HorizontalStack';

const Label = styled.div`
    white-space: nowrap;
    margin-right: 0.25rem;
    &::after {
        content: ':';
    }
`;

const Time = styled.div`
    font-family: monospace;
    white-space: nowrap;
`;

type Props = {
    label?: string;
    timeZone?: string;
    epochTime: number;
};

const TimeViewer: React.FC<Props> = ({ label: givenLabel, timeZone, epochTime }: Props) => {
    if (!givenLabel && !timeZone) {
        throw new Error('Either label or timeZone is required.');
    }
    const label = givenLabel ?? timeZone.split('/').at(-1).replaceAll('_', ' ');
    const time = timeZone ? moment(epochTime).tz(timeZone) : moment(epochTime);
    return (
        <HorizontalStack>
            <Label>{label}</Label>
            <Time>{time.format('YYYY-MM-DD HH:mm ZZ')}</Time>
        </HorizontalStack>
    );
};

export default TimeViewer;
