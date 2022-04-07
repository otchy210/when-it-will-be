import styled from 'styled-components';
import ViewerBox from './ViewerBox';

const Hr = styled.hr`
    margin: 0;
    border-style: solid;
    border-color: #ccc;
    border-width: 1px 0 0 0;
`;

type Props = Record<string, never>;

const ViewerLine: React.FC<Props> = () => {
    return (
        <ViewerBox>
            <Hr />
        </ViewerBox>
    );
};

export default ViewerLine;
