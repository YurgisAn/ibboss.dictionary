/** Заголовок таблицы */
import React from 'react';
import { 
            HeaderWrapper,
            Header,
            HeaderCellContent, 
            HeaderCellSpacer,
            HeaderCell, 
            HeaderCellTitle, 
            TitleContent,
            Title,
            SortIcon,
            ResizerWrapper,
            Resizer
        } from '../styled';
import { isDefined } from '~/helpers/guards';
import { Column } from '@vtb/ui-kit3';     
import { Filter } from '../Filter/Filter';  
import type { СolumnInfoDto } from '~/shared/models';
import { DEFAULT_COLUMN_WIDTH } from '../constants';
type ColumnWithResizerWidth = Column & { resizerWidth: number };

type FilterProps = {
  closeMenu: () => void;
  setFilterActive: (isActive: boolean) => void;
};

type PropType = {
    columns: СolumnInfoDto[];
    headerLineClamp?:number;
    dimension?: string;
    onSortChange?: (sortObj: { name: string; sort: 'asc' | 'desc' | 'initial' }) => void;
    renderFilter?: (obj: FilterProps) => React.ReactNode;
    renderFilterIcon?: () => React.ReactNode;
    onFilterMenuClickOutside?: (obj: FilterProps, event: Event) => void;
    onFilterMenuOpen?: () => void;
    onFilterMenuClose?: () => void;
};


export const TableHeader: React.FC<PropType> = ({columns,   
                                            headerLineClamp = 1,
                                            dimension = 'm',
                                            onSortChange,
                                            renderFilter,
                                            renderFilterIcon,
                                            onFilterMenuClickOutside,
                                            onFilterMenuClose,
                                            onFilterMenuOpen}) => 
{
    // Счетчик смены сортировки для столбца. При третьем нажатии на столбец сортировка должна отменяться
    const sortedCol = React.useRef<{ name: string; count: number }>({ name: '', count: 0 });
    const defaultSpacer = dimension === 'l' || dimension === 'xl' ? '16px' : '12px';
    const spacer = defaultSpacer;
    const [cols, setColumns] = React.useState([...columns]);
    const headerRef = React.useRef<HTMLDivElement>(null);
    const iconSize = dimension === 's' || dimension === 'm' ? 16 : 20;
    const [sort, setSort] = React.useState({} as any);
    const disableColumnResize= false;

    /**Прорисовываем заголовок */
    const renderHeaderCell = (
        {
          name,
          title,
          width = DEFAULT_COLUMN_WIDTH,
          cellAlign = 'left',
          sortable = false,
          renderFilter,
          renderFilterIcon,
          onFilterMenuClickOutside,
          onFilterMenuClose,
          onFilterMenuOpen
        }: ColumnWithResizerWidth,
        index: number,
      ) => {
        const cellRef = React.useRef(null);
        return (
          <HeaderCell
            key={`head_${name}`}
            style={{minWidth: width }}
            data-cellalign={cellAlign}
            data-sort={String(sort[name] || 'initial')}
            className="th"
            ref={cellRef}
          >
            <HeaderCellContent>
              <HeaderCellTitle onClick={sortable ? () => handleSort(name) : undefined}>
                <TitleContent sortable={sortable}>
                  <Title lineClamp={headerLineClamp}>{title}</Title>
                </TitleContent>
                {sortable && <SortIcon width={iconSize} height={iconSize} />}
              </HeaderCellTitle>
              <HeaderCellSpacer width={renderFilter ? spacer : `${parseInt(spacer) - parseInt(defaultSpacer)}px`} />
                {renderFilter && (
                  <Filter
                    renderFilter={renderFilter}
                    renderFilterIcon={renderFilterIcon}
                    onFilterMenuClickOutside={onFilterMenuClickOutside}
                    onFilterMenuOpen={onFilterMenuOpen}
                    onFilterMenuClose={onFilterMenuClose}
                    cellAlign={cellAlign}
                    targetRef={cellRef}
                  />
                )}
            </HeaderCellContent>
            <ResizerWrapper>
              <Resizer />
            </ResizerWrapper>
          </HeaderCell>                    
        );
    };
    
    /** Сортировка */
    const handleSort = (name: string) => {
        let newSort = sort[name] === 'asc' ? 'desc' : 'asc';
    
        // нажатие на столбец, у которого уже включена сортировка
        if (sortedCol.current.name === name) {
          // если уже дважды нажали, отключаем сортировку
          if (sortedCol.current.count === 2) {
            newSort = 'initial';
            sortedCol.current = { name: '', count: 0 };
          } else {
            sortedCol.current = { name, count: 2 };
          }
        }
        // нажатие на столбец с выключенной сортировкой
        else {
          sortedCol.current = { name, count: 1 };
        }
        const toRemove = cols.reduce((sortObj, col) => {
          sortObj[col.value] = 'initial';
          return sortObj;
        }, {} as Record<any, any>);
        setSort({ ...toRemove, [name]: newSort });    
        onSortChange?.({ name, sort: newSort as any });
    };

return (
            <HeaderWrapper>
                <Header ref={headerRef} className="tr" data-underline={true}>
                    {columns.map((col, index) => renderHeaderCell(
                        {
                            name: col.sortBy ?? col.value,
                            title: col.title,
                            width: (100/columns.length)+'%',
                            cellAlign: 'left',
                            sortable: isDefined(col.sortBy),
                            renderFilter:renderFilter
                        } as ColumnWithResizerWidth, index))}
                </Header>
            </HeaderWrapper>
        );
};
