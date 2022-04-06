import styled from 'styled-components';

const Input = styled.input``;

type Props = {
    id: string;
    options: [value: string, label: string][];
    onChange: (countryCode: string) => void;
};

const DatalistInput: React.FC<Props> = ({ id, options, onChange }: Props) => {
    return (
        <>
            <Input id={id} list={`${id}-options`} onChange={(e) => onChange(e.target.value)} />
            <datalist id={`${id}-options`}>
                {options.map(([value, label]) => {
                    return <option value={value}>{label}</option>;
                })}
            </datalist>
        </>
    );
};

export default DatalistInput;
