import moment from 'moment-timezone';
import styled from 'styled-components';
import { formatLabel } from '../utils/TimeZone';
import HorizontalStack from './HorizontalStack';
import Label from './Label';

const Time = styled.div`
    font-family: monospace;
    white-space: nowrap;
`;

type Props = {
    label?: string;
    timeZone?: string;
    time: number;
};

const TimeViewer: React.FC<Props> = ({ label: givenLabel, timeZone, time }: Props) => {
    if (!givenLabel && !timeZone) {
        throw new Error('Either label or timeZone is required.');
    }
    const label = givenLabel ?? formatLabel(timeZone, time);
    const mmt = timeZone ? moment(time).tz(timeZone) : moment(time);
    return (
        <HorizontalStack>
            <Label>{label}</Label>
            <Time>{mmt.format('HH:mm ZZ')}</Time>
        </HorizontalStack>
    );
};

export default TimeViewer;
