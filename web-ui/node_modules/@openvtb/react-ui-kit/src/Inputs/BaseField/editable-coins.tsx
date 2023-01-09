import React, { KeyboardEvent } from 'react';

import { KEY_CODES } from '../../common';
import type { Size } from '../common/types';

import { Coins } from './StyledComponents';

export interface IEditableCoinsProps {
  onChange: (event: any) => void;
  html: string;
  position: number;
  disabled?: boolean;
  setIntegerFocused: Function;
  setFocusedStyle: Function;
  dimension: Size;
}

class EditableCoins extends React.Component<IEditableCoinsProps & { innerRef: any }> {
  elementRef: any;
  lastHtml = '';

  constructor(props) {
    super(props);
    this.elementRef = props.innerRef;
  }

  shouldComponentUpdate = (nextProps) => {
    return (
      nextProps.html !== this.elementRef?.current?.innerHTML ||
      this.props.position !== nextProps.position ||
      this.props.dimension !== nextProps.dimension ||
      this.props.disabled !== nextProps.disabled
    );
  };

  emitChange = () => {
    const html = this.elementRef?.current?.innerHTML;
    const { onChange } = this.props;

    if (onChange && html !== this.lastHtml) {
      onChange({ target: { value: html } });
    }
    this.lastHtml = html;
  };

  onBlur = (event) => {
    const { innerText } = event.target;
    const { onChange } = this.props;

    if (onChange && innerText.length < 2) {
      onChange({ target: { value: '00' } });
      this.lastHtml = '00';
    }

    this.props.setFocusedStyle(false);
  };

  onKeyDown = (event: KeyboardEvent<HTMLElement>): void | boolean => {
    const { disabled, setIntegerFocused } = this.props;

    if (disabled) {
      event.preventDefault();
      return false;
    }

    const { keyCode, shiftKey } = event;
    const { innerText } = event.target as HTMLElement;
    const selection = window.getSelection();
    const focusInTheBeginning = selection?.focusOffset === 0;

    if (focusInTheBeginning && keyCode === KEY_CODES.LEFT) {
      this.onBlur(event);
      setIntegerFocused && setIntegerFocused(event);
      return true;
    }

    if (
      // non input key codes
      [
        KEY_CODES.LEFT,
        KEY_CODES.RIGHT,
        KEY_CODES.BACKSPACE,
        KEY_CODES.DELETE,
        KEY_CODES.SHIFT,
        KEY_CODES.ALT,
        KEY_CODES.CTRL,
        KEY_CODES.TAB,
        KEY_CODES.HOME,
        KEY_CODES.END,
      ].includes(keyCode)
    ) {
      return true;
    }

    if (
      innerText.length === 2 ||
      !(KEY_CODES.ZERO <= keyCode && keyCode <= KEY_CODES.NINE) ||
      shiftKey
    ) {
      event.preventDefault();
      return false;
    }
  };

  render() {
    return (
      <Coins
        ref={this.props.innerRef}
        key={Date()}
        position={this.props.position}
        onInput={this.emitChange}
        onBlur={this.onBlur}
        onFocus={() => this.props.setFocusedStyle(true)}
        onKeyDown={this.onKeyDown}
        dimension={this.props.dimension}
        contentEditable
        dangerouslySetInnerHTML={{ __html: this.props.html }}
        disabled={this.props.disabled}
      />
    );
  }
}

export default React.forwardRef((props: IEditableCoinsProps, ref: any) => (
  <EditableCoins innerRef={ref} {...props} />
));
