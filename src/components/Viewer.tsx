import { ReactNode } from 'react';

type Props = {
    children?: ReactNode;
};

const Viewer: React.FC<Props> = ({ children }: Props) => {
    return <table>{children}</table>;
};

export default Viewer;
