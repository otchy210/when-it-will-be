import { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
};

const ViewerBox: React.FC<Props> = ({ children }: Props) => {
    return (
        <tr>
            <td colSpan={2}>{children}</td>
        </tr>
    );
};

export default ViewerBox;
