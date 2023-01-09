import React, { useRef, useState } from 'react';
import type { ChangeEvent, FC, KeyboardEvent, MouseEvent } from 'react';

import { ReactComponent as ChevronLeftOutline } from '../Icons/system/ChevronLeftOutline.svg';
import { ReactComponent as ChevronRightOutline } from '../Icons/system/ChevronRightOutline.svg';
import { Body1Short } from '../Typography';
import { KEY_CODES } from '../common';

import { Button } from './Button';
import { Input } from './Input';
import { Pages } from './Pages';
import { PaginationSimpleComponent } from './PaginationSimpleComponent';

const BOUNDARY_PAGES = 5;
const ELLIPSIS = '...';
const FIRST_PAGE = 1;
const ICON_SIZE = 24;
const PAGES_WITHOUT_ELLIPSIS = 7;
const PAGES_WITHOUT_INPUT = 21;
const PLACEHOLDER = 'На страницу';
const SIBLING_PAGES = 2;
const SIBLING_PAGES_MOBILE = 1;

export interface IPaginationSimpleProps {
  /** Имя класса для переопределения стилей */
  className?: string;
  /** Текущая страница */
  currentPage: number;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Список задизейбленных страниц */
  disabledPages?: Array<number>;
  /** Мобильный вид компонента */
  mobile?: boolean;
  /** Список страниц */
  pages: number;
  /** Коллбэк на изменение страницы */
  onChange: (page: number) => void;
}

export const PaginationSimple: FC<IPaginationSimpleProps> = ({
  className,
  currentPage,
  dataTestId,
  disabledPages = [],
  mobile = false,
  pages,
  onChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  const allPages = Array.from({ length: pages }, (_, idx) => idx + 1);

  const getNumericInputValue = () => {
    const numericInputValue = parseInt(inputValue);
    if (numericInputValue < FIRST_PAGE) return FIRST_PAGE;
    if (numericInputValue > pages) return pages;
    if (isNaN(numericInputValue)) return currentPage;
    return numericInputValue;
  };

  const handleInputBlur = () => {
    onChange(getNumericInputValue());
    setInputValue('');
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) =>
    setInputValue(event.target.value);

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.keyCode === KEY_CODES.MINUS ||
      event.keyCode === KEY_CODES.NUMPAD_SUBTRACT ||
      event.keyCode === KEY_CODES.PERIOD ||
      event.keyCode === KEY_CODES.NUMPAD_DECIMAL
    ) {
      event.preventDefault();
    }
    if (event.keyCode === KEY_CODES.ENTER) inputRef.current?.blur();
  };

  const handleButtonFocusPrevent = (event: MouseEvent<HTMLButtonElement>) => event.preventDefault();

  const getPreviousPage = () => {
    const previousPages = allPages.slice(0, currentPage - 1);
    const availablePreviousPages = previousPages.filter((page) => !disabledPages.includes(page));
    return availablePreviousPages[availablePreviousPages.length - 1];
  };

  const getNextPage = () => {
    const nextPages = allPages.slice(currentPage);
    const availableNextPages = nextPages.filter((page) => !disabledPages.includes(page));
    return availableNextPages[0];
  };

  const renderPage = (page: number) => (
    <Button
      disabled={disabledPages.includes(page)}
      key={page}
      selected={currentPage === page}
      onClick={() => onChange(page)}
      onMouseDown={handleButtonFocusPrevent}
    >
      <Body1Short>{page}</Body1Short>
    </Button>
  );

  const renderPages = (pagesList: Array<number>) => pagesList.map(renderPage);

  const renderEllipsis = () => (
    <Button tabIndex={-1} withEllipsis>
      <Body1Short>{ELLIPSIS}</Body1Short>
    </Button>
  );

  const shouldRenderEllipsis = (position: 'left' | 'right') => {
    if (mobile) {
      return position === 'left'
        ? currentPage > BOUNDARY_PAGES - 1
        : currentPage < pages - BOUNDARY_PAGES + 2;
    }

    return position === 'left'
      ? currentPage > BOUNDARY_PAGES
      : currentPage < pages - BOUNDARY_PAGES + 1;
  };

  const renderPagesWithEllipsis = () => {
    const decCurrentPage = currentPage - 1;
    const incCurrentPage = currentPage + 1;

    const startBoundaryPages = allPages.slice(0, BOUNDARY_PAGES);
    const endBoundaryPages = allPages.slice(pages - BOUNDARY_PAGES);
    const commonBoudaryPages = startBoundaryPages.filter((page) => endBoundaryPages.includes(page));

    const leftSiblingPage = currentPage - (mobile ? SIBLING_PAGES_MOBILE : SIBLING_PAGES);
    const rightSiblingPage = currentPage + (mobile ? SIBLING_PAGES_MOBILE : SIBLING_PAGES);

    const middlePages = allPages.filter((page) =>
      (startBoundaryPages.includes(page) &&
        startBoundaryPages.includes(mobile ? incCurrentPage : currentPage)) ||
      (endBoundaryPages.includes(page) &&
        endBoundaryPages.includes(mobile ? decCurrentPage : currentPage))
        ? false
        : page >= leftSiblingPage && page <= rightSiblingPage
    );

    const excludeCommonBoundaryPages = (page) =>
      commonBoudaryPages.includes(currentPage) ? !commonBoudaryPages.includes(page) : true;

    const renderStart = () =>
      startBoundaryPages.includes(mobile ? incCurrentPage : currentPage)
        ? renderPages(startBoundaryPages)
        : renderPage(FIRST_PAGE);

    const renderEnd = () =>
      endBoundaryPages.includes(mobile ? decCurrentPage : currentPage)
        ? renderPages(
            mobile ? endBoundaryPages : endBoundaryPages.filter(excludeCommonBoundaryPages)
          )
        : renderPage(pages);

    return (
      <>
        {renderStart()}
        {shouldRenderEllipsis('left') && renderEllipsis()}
        {renderPages(middlePages)}
        {shouldRenderEllipsis('right') && renderEllipsis()}
        {renderEnd()}
      </>
    );
  };

  const previousPage = getPreviousPage();
  const nextPage = getNextPage();

  return (
    <PaginationSimpleComponent className={className} data-test-id={dataTestId}>
      {!mobile && (
        <Button
          disabled={!previousPage}
          onClick={() => onChange(previousPage)}
          onMouseDown={handleButtonFocusPrevent}
        >
          <ChevronLeftOutline height={ICON_SIZE} width={ICON_SIZE} />
        </Button>
      )}
      <Pages>
        {pages > PAGES_WITHOUT_ELLIPSIS ? renderPagesWithEllipsis() : renderPages(allPages)}
      </Pages>
      {!mobile && (
        <Button
          disabled={!nextPage}
          onClick={() => onChange(nextPage)}
          onMouseDown={handleButtonFocusPrevent}
        >
          <ChevronRightOutline height={ICON_SIZE} width={ICON_SIZE} />
        </Button>
      )}
      {pages > PAGES_WITHOUT_INPUT && !mobile && (
        <Input
          placeholder={PLACEHOLDER}
          ref={inputRef}
          type="number"
          value={inputValue}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      )}
    </PaginationSimpleComponent>
  );
};
