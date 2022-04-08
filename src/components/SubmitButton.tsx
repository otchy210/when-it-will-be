import { ReactNode, useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from './Button';

const DesiginedButton = styled(Button)`
    background-color: #009;
    color: #fff;
`;

type Props = {
    children?: ReactNode;
    disabled?: boolean;
    onClick: () => void;
    focus?: boolean;
};

const SubmitButton: React.FC<Props> = ({ children, disabled, onClick, focus }: Props) => {
    const inputRef = useRef<HTMLInputElement>();
    useEffect(() => {
        if (!disabled && focus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [disabled, focus, inputRef.current]);

    return (
        <DesiginedButton disabled={disabled} ref={inputRef} onClick={() => onClick()}>
            {children}
        </DesiginedButton>
    );
};

export default SubmitButton;
