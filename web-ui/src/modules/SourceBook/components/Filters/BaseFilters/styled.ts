import { ReactComponent as FilterOutline } from '@openvtb/admiral-icons/build/system/FilterOutline.svg';
import { ReactComponent as ShapeOutline } from '@openvtb/admiral-icons/build/system/ShapeOutline.svg';
import { DropDownItem, DropDownMenu } from '@vtb/ui-kit3';
import styled, { css } from 'styled-components';

import { ReactComponent as SortByIconDefault } from '~/assets/img/sortByIcon.svg';

export const FastFilters = styled.div`
    position: sticky;
    top: 16px;
    z-index: 8;
    box-shadow: 0 4px 16px rgba(138, 150, 168, 0.4), 0 0 6px rgba(138, 150, 168, 0.08);
    padding: 16px 24px;
    margin-bottom: 12px;
    border-radius: 8px;
    background-color: ${({ theme }) => theme.color.background.primary};
`;

export const TotalCount = styled.div`
    margin: 0 0 0 32px;
    text-align: center;
    font-size: 14px;
    color: ${({ theme }) => theme.color.text.secondary};
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 4px;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    width: 24px;
    height: 24px;

    > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;

export const sharedButtonIconStyles = css<{ isLoading?: boolean; isDisabled?: boolean }>`
    height: 24px;
    cursor: pointer;
    path {
        fill: ${({ theme, isLoading, isDisabled }) =>
            isLoading || isDisabled ? theme.color.basic.disable : theme.color.basic.primary};
    }
`;

export const FilterOutlineIcon = styled(FilterOutline)`
    ${sharedButtonIconStyles}
`;

export const SortByIcon = styled(SortByIconDefault)`
    ${sharedButtonIconStyles}
`;

export const SortArrowIconWrapper = styled.div<{ rotated: boolean }>`\
    display: flex;
    justify-content: center;
    align-items: center;

    transition-duration: 0.7s;
    transform: rotate(${({ rotated }) => (rotated ? '180deg' : '0deg')});
`;

export const SortArrowIcon = styled(ShapeOutline)`
    ${sharedButtonIconStyles}

    height: 18px;
`;

export const DropDownMenuStyled = styled(DropDownMenu)`
    width: 200px;
`;
export const DropDownItemStyled = styled(DropDownItem)``;

export const InfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const InfoItem = styled.div``;

export const InfoRightContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;
