import React, { FC, MouseEvent } from 'react';

import { ReactComponent as ChevronLeftOutline } from '../../Icons/system/ChevronLeftOutline.svg';
import { ReactComponent as ChevronRightOutline } from '../../Icons/system/ChevronRightOutline.svg';
import { FIRST_PAGE, ICON_SIZE } from '../constants';

import { Button } from './Button';
import { Layout } from './Layout';

interface IButtonProps {
  lastPage: number;
  page: number;
  onClick: (newPage: number) => void;
}

export const Buttons: FC<IButtonProps> = ({ lastPage, page, onClick }) => {
  const handleFocusPrevent = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const previousPage = page - 1;
  const nextPage = page + 1;

  return (
    <Layout>
      <Button
        disabled={previousPage < FIRST_PAGE}
        onClick={() => onClick(previousPage)}
        onMouseDown={handleFocusPrevent}
      >
        <ChevronLeftOutline width={ICON_SIZE} height={ICON_SIZE} />
      </Button>
      <Button
        disabled={nextPage > lastPage}
        onClick={() => onClick(nextPage)}
        onMouseDown={handleFocusPrevent}
      >
        <ChevronRightOutline width={ICON_SIZE} height={ICON_SIZE} />
      </Button>
    </Layout>
  );
};
