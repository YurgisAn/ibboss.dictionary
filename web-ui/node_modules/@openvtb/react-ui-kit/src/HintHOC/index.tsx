import React, { createRef, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import type { ComponentType, RefObject } from 'react';

import { Body2Long } from '../Typography';
import { containNode, getContainingBlockOffset, getScrollableParents } from '../common/utils';
import { ReactComponent as CloseOutline } from '../Icons/service/CloseOutline.svg';

import { CloseIconWrapper } from './CloseIconWrapper';
import { Hint } from './Hint';
import { Wrapper } from './Wrapper';
import { calculatePosition, findAlign, findDirection } from './utils';
import { SIZES } from './constants';
import type { Align, Direction, Size } from './constants';

export interface IHintHOCProps {
  /** Выравнивание подсказки */
  align?: Align;
  /** Имя класса для переопределения стилей */
  className?: string;
  /** Контейнер, в котором происходит размещение.
   * В отличие от TooltipHOC, данный компонент по дизайну всегда имеет target, относительно
   * которого будет происходить позиционирование - это оборачиваемый компонент (иконка и т.п.) */
  container?: Element | null;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Направление подсказки */
  direction?: Direction;
  /** Светлый вариант подсказки */
  light?: boolean;
  /** Текст подсказки */
  message: string;
  /** Отступ подсказки */
  offset?: number;
  /** Размер подсказки */
  size?: Size;
  /** Показать/скрыть подсказку */
  visible?: boolean;
  /** Обработчик, срабатывающий при попытке пользователя закрыть подсказку */
  onRequestHide?: () => void;
}

interface IHintHOCState {
  pointerAlign: Align;
  pointerDirection: Direction;
  posX: number;
  posY: number;
}

const DEFAULT_POINTER_ALIGN: Align = 'left';
const DEFAULT_POINTER_DIRECTION: Direction = 'bottom';

export const createHintHOC = <P extends Object>(WrappedComponent: ComponentType<P>) =>
  class HintHOC extends PureComponent<P & IHintHOCProps, IHintHOCState> {
    hintRef: RefObject<HTMLDivElement>;
    wrapperRef: RefObject<HTMLDivElement>;

    scrollableParents?: Array<Element> = undefined;

    constructor(props: P & IHintHOCProps) {
      super(props);
      this.hintRef = createRef();
      this.wrapperRef = createRef();

      this.state = {
        pointerAlign: DEFAULT_POINTER_ALIGN,
        pointerDirection: DEFAULT_POINTER_DIRECTION,
        posX: 0,
        posY: 0,
      };
    }

    componentDidMount() {
      document.addEventListener('click', this.handleDocumentClick.bind(this));
      window.addEventListener('scroll', this.onHide);
      window.addEventListener('resize', this.onHide);
      this.changePosition();
    }

    componentDidUpdate(prevProps: IHintHOCProps, _: IHintHOCState) {
      if (!this.scrollableParents && this.hintRef.current) {
        this.scrollableParents = getScrollableParents(this.hintRef.current);
        this.scrollableParents?.forEach((el) => el.addEventListener('scroll', this.onHide));
      }
      if (prevProps.visible === this.props.visible) return;
      this.changePosition();
    }

    componentWillUnmount() {
      document.removeEventListener('click', this.handleDocumentClick.bind(this));
      window.removeEventListener('scroll', this.onHide);
      window.removeEventListener('resize', this.onHide);
      this.scrollableParents &&
        this.scrollableParents.forEach((el) => el.removeEventListener('scroll', this.onHide));
    }

    handleDocumentClick(e: MouseEvent) {
      if (this.wrapperRef.current && !containNode(this.wrapperRef.current, e.target)) {
        this.onHide();
      }
    }

    changePosition = () => {
      if (!this.props.visible) return;
      const hintNode = this.hintRef.current;
      const wrapperNode = this.wrapperRef.current;
      if (!hintNode || !wrapperNode) return;

      const hintRect = hintNode.getBoundingClientRect();
      const wrapperRect = wrapperNode.getBoundingClientRect();

      const direction: Direction | undefined =
        this.props.direction || findDirection(hintRect, wrapperRect);
      if (!direction) return;

      const align: Align | undefined = this.props.align || findAlign(hintRect, wrapperRect);
      if (!align) return;

      const { parentTop, parentLeft } = getContainingBlockOffset(hintNode);
      const offset = { width: wrapperRect.left - parentLeft, height: wrapperRect.top - parentTop };
      const hintCoords = calculatePosition(direction, align, hintRect, wrapperRect, offset);
      if (!hintCoords) return;

      this.setState({
        pointerAlign: align,
        pointerDirection: direction,
        posX: hintCoords.posX,
        posY: hintCoords.posY,
      });
    };

    handleHide = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      this.onHide();
    };

    onHide = () => {
      this.props.onRequestHide?.();
    };

    renderInformer() {
      const { light, message, size = 'big', visible }: IHintHOCProps = this.props;
      const { pointerAlign, pointerDirection, posX, posY } = this.state;

      return (
        <Hint
          light={light}
          offset={this.props.offset}
          pointerAlign={pointerAlign}
          pointerDirection={pointerDirection}
          position={{ posX, posY }}
          ref={this.hintRef}
          visible={visible}
          width={SIZES[size]}
        >
          <CloseIconWrapper light={light} onClick={this.handleHide}>
            <CloseOutline height={20} width={20} />
          </CloseIconWrapper>
          <Body2Long>{message}</Body2Long>
        </Hint>
      );
    }

    render() {
      const { className, container, dataTestId }: IHintHOCProps = this.props;

      return (
        <Wrapper className={className} data-test-id={dataTestId} ref={this.wrapperRef}>
          <WrappedComponent {...this.props} />
          {container
            ? ReactDOM.createPortal(this.renderInformer(), container)
            : this.renderInformer()}
        </Wrapper>
      );
    }
  };
