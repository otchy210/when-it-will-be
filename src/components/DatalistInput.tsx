import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Input = styled.input``;

type Props = {
    id: string;
    options: [value: string, label: string][];
    onChange: (countryCode: string) => void;
    focus?: boolean;
};

const DatalistInput: React.FC<Props> = ({ id, options, onChange, focus }: Props) => {
    const inputRef = useRef<HTMLInputElement>();
    useEffect(() => {
        if (focus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [focus, inputRef.current]);
    return (
        <>
            <Input id={id} list={`${id}-options`} onChange={(e) => onChange(e.target.value)} ref={inputRef} />
            <datalist id={`${id}-options`}>
                {options.map(([value, label]) => {
                    return <option value={value}>{label}</option>;
                })}
            </datalist>
        </>
    );
};

export default DatalistInput;
