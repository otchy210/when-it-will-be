import React, { ChangeEvent, useEffect, useRef } from 'react';
import Label from './Label';

type Props = {
    time: number;
    onChangeTime: (time: number) => void;
};

const ViewerTimeSelector: React.FC<Props> = ({ time, onChangeTime }: Props) => {
    const inputRef = useRef<HTMLInputElement>();
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [inputRef.current]);

    const date = new Date(time);
    const hh = String(date.getHours()).padStart(2, '0');
    const mm = String(date.getMinutes()).padStart(2, '0');
    const value = `${hh}:${mm}`;

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const [hh, mm] = e.target.value.split(':');
        date.setHours(Number(hh));
        date.setMinutes(Number(mm));
        const newTime = date.getTime();
        if (newTime !== time) {
            onChangeTime(newTime);
        }
    };
    return (
        <tr>
            <tr>
                <Label>Local time</Label>
            </tr>
            <td>
                <input type="time" value={value} onChange={onChange} step={5 * 60} ref={inputRef} />
            </td>
        </tr>
    );
};

export default ViewerTimeSelector;
