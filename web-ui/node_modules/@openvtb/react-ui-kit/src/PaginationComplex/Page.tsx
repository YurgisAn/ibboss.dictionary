import React, { FC } from 'react';

import { Buttons } from './Buttons';
import { Dropdown } from './Dropdown';
import { Group } from './Group';
import { PageLabel } from './PageLabel';
import { Separator } from './Separator';
import { Spacer } from './Spacer';
import { FIRST_PAGE } from './constants';

interface IPageProps {
  disablePageSelect: boolean;
  lastPage: number;
  mobile: boolean;
  page: number;
  onChange: (newPage: number) => void;
}

export const Page: FC<IPageProps> = ({ disablePageSelect, lastPage, mobile, page, onChange }) => {
  const pagesList = Array.from({ length: lastPage }, (_, idx) => idx + 1);

  return (
    <Group>
      {!mobile && (
        <>
          <Separator />
          <Dropdown
            disabled={disablePageSelect || lastPage === FIRST_PAGE}
            list={pagesList}
            value={page}
            onChange={onChange}
          />
          <Spacer $size={4} />
          <PageLabel>{`из ${lastPage} страниц`}</PageLabel>
          <Spacer $size={10} />
        </>
      )}
      <Buttons lastPage={lastPage} page={page} onClick={onChange} />
    </Group>
  );
};
