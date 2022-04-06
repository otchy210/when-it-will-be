import { TimeZoneDB } from '../types';
import HorizontalStack from './HorizontalStack';

type Props = {
    timeZoneDB: TimeZoneDB;
};

const TimeZoneSelector: React.FC<Props> = ({ timeZoneDB }: Props) => {
    return (
        <HorizontalStack>
            <select>
                {Object.entries(timeZoneDB).map(([code, [name]]) => {
                    return <option value={code}>{name}</option>;
                })}
            </select>
        </HorizontalStack>
    );
};

export default TimeZoneSelector;
