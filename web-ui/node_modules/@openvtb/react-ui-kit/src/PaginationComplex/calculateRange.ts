import { FIRST_PAGE } from './constants';

export const calculateRange = ({
  itemsPerPage,
  lastPage,
  page,
  totalItems,
}: {
  itemsPerPage: number;
  lastPage: number;
  page: number;
  totalItems: number;
}) => {
  const calculateStart = () => (page === FIRST_PAGE ? 1 : (page - 1) * itemsPerPage + 1);
  const calculateEnd = () => {
    if (page === FIRST_PAGE) return itemsPerPage;
    if (page === lastPage) return totalItems;
    return itemsPerPage * page;
  };

  return {
    start: calculateStart(),
    end: calculateEnd(),
  };
};
