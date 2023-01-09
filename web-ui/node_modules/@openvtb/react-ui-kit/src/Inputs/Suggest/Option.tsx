import React, {
  useState,
  useRef,
  useEffect,
  MutableRefObject,
  Dispatch,
  FC,
  MouseEvent,
  RefObject,
} from 'react';

import { createTooltipHOC } from '../../TooltipHOC';
import type { Size } from '../common';

import { isString } from './utils';
import {
  OptionWrapper,
  TextWrapper,
  StyledBody1Long,
  StyledBody2Long,
  ColorText,
} from './styled-components';

import type { IOptionSuggest } from './index';

interface IOption {
  size: Size;
  item?: string | IOptionSuggest<any>;
  tooltipMessage?: string;
  setShowMenu?: Dispatch<React.SetStateAction<boolean>>;
  tooltipContainer?: Element | null;
  inputRef?: RefObject<HTMLInputElement>;
  renderElementOption?: (options: string | IOptionSuggest<any>) => any;
  onChange?: (value: string | IOptionSuggest) => void;
  setInputValue?: Dispatch<React.SetStateAction<string>>;
  inputValue?: string;
  label?: string;
  selectedItem?: string | IOptionSuggest<any>;
}

export const Option: FC<IOption> = ({
  children,
  size,
  setShowMenu,
  tooltipContainer,
  inputRef,
  renderElementOption,
  item,
  setInputValue,
  onChange,
  inputValue,
  tooltipMessage,
  label,
  selectedItem,
}) => {
  const [overflow, setOverflow] = useState(false);

  const wrapperRef: MutableRefObject<HTMLDivElement | null> = useRef(null);
  const contentRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const detectOverflow = (e: HTMLDivElement) => e?.offsetWidth < e?.scrollWidth;

  const Label = size === 'micro' ? StyledBody2Long : StyledBody1Long;
  const startText = label?.slice?.(0, inputValue?.length);
  const endText = label?.slice?.(inputValue?.length);

  useEffect(() => {
    const contentCurrent = contentRef.current;

    if (contentCurrent && detectOverflow(contentCurrent) !== overflow) {
      setOverflow(detectOverflow(contentCurrent));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const OptionContent = overflow ? createTooltipHOC(TextWrapper) : TextWrapper;
  const tooltip = tooltipMessage || label || '';

  const onOptionClick = () => {
    inputRef?.current?.focus?.();
    setShowMenu?.(false);
    label && item && onChange?.(item);
    label && setInputValue?.(label);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => e.preventDefault();

  const selected =
    !isString(item) && !isString(selectedItem)
      ? selectedItem?.id === item?.id
      : item === selectedItem;

  return (
    <OptionWrapper
      size={size}
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      onClick={onOptionClick}
    >
      {renderElementOption && item ? (
        renderElementOption(item)
      ) : (
        <OptionContent tooltip={tooltip} target={wrapperRef.current} container={tooltipContainer}>
          <Label ref={contentRef}>
            {label ? (
              <>
                {selected ? (
                  <ColorText>{label}</ColorText>
                ) : (
                  <>
                    <ColorText>{startText}</ColorText>
                    {endText}
                  </>
                )}
              </>
            ) : (
              children
            )}
          </Label>
        </OptionContent>
      )}
    </OptionWrapper>
  );
};
