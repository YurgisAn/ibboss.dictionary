import styled from 'styled-components';

export const refreshIntervalSec = 60;
export const pageSizes: number[] = [10, 20, 50, 99];
export const defaultPageSize = pageSizes[1];
export const defaultPageNumber = 1;
export const DEFAULT_COLUMN_WIDTH = 100;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
 `;
