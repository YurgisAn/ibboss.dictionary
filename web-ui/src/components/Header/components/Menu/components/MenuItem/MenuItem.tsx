import styled from 'styled-components';

import { Link } from '~/components/Link';

export const MenuItem = styled(Link)`
    display: flex;
    gap: 4px;
    margin: 0 12px;
    line-height: 20px;
    font-size: 14px;
    :focus,
    :hover {
        color: ${({ theme }) => theme.color.basic.primary};
    }
`;
