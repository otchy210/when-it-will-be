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
    label: string;
    epochTime: number;
    timeZone?: string;
};

const TimeViewer: React.FC<Props> = ({ label, epochTime, timeZone }: Props) => {
    const time = timeZone ? moment(epochTime).tz(timeZone) : moment(epochTime);
    return (
        <HorizontalStack>
            <Label>{label}</Label>
            <Time>{time.format('YYYY-MM-DD HH:mm ZZ')}</Time>
        </HorizontalStack>
    );
};

export default TimeViewer;
