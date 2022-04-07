import moment from 'moment-timezone';
import React from 'react';
import styled from 'styled-components';
import { formatLabel } from '../utils/TimeZone';
import Label from './Label';

const Time = styled.td`
    font-family: monospace;
    font-size: 1rem;
    white-space: nowrap;
`;

type Props = {
    label?: string;
    timeZone?: string;
    time: number;
    onClickLabel?: () => void;
};

const ViewerTime: React.FC<Props> = ({ label: givenLabel, timeZone, time, onClickLabel }: Props) => {
    if (!givenLabel && !timeZone) {
        throw new Error('Either label or timeZone is required.');
    }
    const label = givenLabel ?? formatLabel(timeZone, time);
    const mmt = timeZone ? moment(time).tz(timeZone) : moment(time);
    return (
        <tr>
            <tr>
                <Label clickable={!!onClickLabel} onClick={onClickLabel}>
                    {label}
                </Label>
            </tr>
            <Time>{mmt.format('HH:mm ZZ')}</Time>
        </tr>
    );
};

export default ViewerTime;
