import styled from 'styled-components';

const Button = styled.button`
    border: none;
    border-radius: 0.25rem;
    padding: 0.25rem 1rem;
    cursor: pointer;
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

export default Button;
