import styled from 'styled-components';

const Label = styled.label`
    white-space: nowrap;
    margin-right: 0.25rem;
    font-weight: bold;
    &::after {
        content: ':';
    }
`;

export default Label;
