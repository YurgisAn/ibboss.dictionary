import React, { Component, createRef } from 'react';
import ReactDOM from 'react-dom';
import type { ComponentType, RefObject } from 'react';

import { Caption1 } from '../Typography';
import { getScrollableParents } from '../common/utils';

import { Tooltip } from './Tooltip';
import { Wrapper } from './Wrapper';
import { calculateTooltipPosition, findTooltipDirection } from './utils';

type Direction = 'bottom' | 'left' | 'right' | 'top';
type DisplayType = 'block' | 'inline-block';

const POINTER_DIRECTION: { [key: string]: Direction } = {
  bottom: 'top',
  left: 'right',
  right: 'left',
  top: 'bottom',
};
const TOOLTIP_DELAY = 1500;

export interface ITooltipHOCProps {
  /** Имя класса для переопределения стилей */
  className?: string;
  /** Контейнер, в котором при необходимости можно отрисовать тултип через ReactDOM.createPortal */
  container?: Element | null;
  /** data-test-id атрибут для тестирования компонента */
  dataTestId?: string;
  /** Направление тултипа */
  direction?: Direction;
  /** Параметр display, согласно которому будет отрисован оборачиваемый в HOC компонент. По умолчанию inline-block */
  display?: DisplayType;
  /** Светлый вариант тултипа */
  light?: boolean;
  /** Ссылка на элемент, относительно которого будет позиционироваться тултип, если оборачиваемый в HOC компонент не подходит */
  target?: Element | null;
  /** Текст тултипа */
  tooltip: string;
  /** Отобразить тултип с задержкой в 1.5 секунды */
  withDelay?: boolean;
}

interface ITooltipHOCState {
  pointerDirection: Direction;
  posX: number;
  posY: number;
  showTooltip: boolean;
}

export const createTooltipHOC = <P extends Object>(WrappedComponent: ComponentType<P>) =>
  class TooltipHOC extends Component<P & ITooltipHOCProps, ITooltipHOCState> {
    tooltipRef: RefObject<HTMLDivElement>;
    wrapperRef: RefObject<HTMLDivElement>;
    showTooltipTimer = 0;
    scrollableParents?: Array<Element> = undefined;

    constructor(props: P & ITooltipHOCProps) {
      super(props);
      this.tooltipRef = createRef();
      this.wrapperRef = createRef();

      this.state = {
        pointerDirection: POINTER_DIRECTION['bottom'],
        posX: 0,
        posY: 0,
        showTooltip: false,
      };
    }

    hideTooltip = () => {
      this.setState({ showTooltip: false });
    };

    componentDidMount() {
      window.addEventListener('scroll', this.hideTooltip);
      window.addEventListener('resize', this.hideTooltip);
    }

    componentDidUpdate() {
      if (!this.scrollableParents && this.tooltipRef.current) {
        this.scrollableParents = getScrollableParents(this.tooltipRef.current);
        this.scrollableParents?.forEach((el) => el.addEventListener('scroll', this.hideTooltip));
      }
    }

    componentWillUnmount() {
      clearTimeout(this.showTooltipTimer);
      this.scrollableParents &&
        this.scrollableParents.forEach((el) => el.removeEventListener('scroll', this.hideTooltip));
      window.removeEventListener('scroll', this.hideTooltip);
      window.removeEventListener('resize', this.hideTooltip);
    }

    handleMouseEnter = () => {
      const { withDelay, direction, target } = this.props;

      const tooltipNode = this.tooltipRef.current;
      const wrapperNode: Element | null | undefined = target || this.wrapperRef.current;
      if (!tooltipNode || !wrapperNode) return;

      this.showTooltipTimer = window.setTimeout(
        () => {
          const tooltipRect = tooltipNode.getBoundingClientRect();
          const wrapperRect = wrapperNode.getBoundingClientRect();

          const tooltipDirection: Direction | undefined =
            direction || findTooltipDirection(wrapperRect, tooltipRect);
          if (!tooltipDirection) return;

          const pointerDirection = POINTER_DIRECTION[tooltipDirection];

          const position = calculateTooltipPosition(wrapperNode, tooltipNode, tooltipDirection);
          const { posX, posY } = position;

          this.setState({
            pointerDirection,
            posX,
            posY,
            showTooltip: true,
          });
        },
        withDelay ? TOOLTIP_DELAY : 0
      );
    };

    handleMouseLeave = () => {
      clearTimeout(this.showTooltipTimer);
      this.hideTooltip();
    };

    renderTooltip() {
      const { light, tooltip } = this.props;
      const { pointerDirection, posX, posY, showTooltip } = this.state;

      return (
        <Tooltip
          light={light}
          pointerDirection={pointerDirection}
          position={{ posX, posY }}
          ref={this.tooltipRef}
          showTooltip={showTooltip}
        >
          <Caption1>{tooltip}</Caption1>
        </Tooltip>
      );
    }

    render() {
      const { className, container, dataTestId, display } = this.props;
      const portalContainer: Element | null | undefined = container;

      return (
        <Wrapper
          className={className}
          data-test-id={dataTestId}
          display={display}
          ref={this.wrapperRef}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <WrappedComponent {...this.props} />
          {portalContainer
            ? ReactDOM.createPortal(this.renderTooltip(), portalContainer)
            : this.renderTooltip()}
        </Wrapper>
      );
    }
  };
