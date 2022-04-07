import styled from 'styled-components';

const Label = styled.span<{ clickable?: boolean }>`
    white-space: nowrap;
    margin-right: 0.25rem;
    font-weight: bold;
    font-size: 1rem;
    cursor: ${(props) => (props.clickable ? 'pointer' : 'default')};
    &::after {
        content: ':';
    }
`;

export default Label;
