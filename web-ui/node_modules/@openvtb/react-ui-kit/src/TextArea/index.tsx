import React, {
  ChangeEvent,
  FocusEvent,
  forwardRef,
  MutableRefObject,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Body2Short } from '../Typography';

import { LimitLabel } from './LimitLabel';
import { Footer } from './Footer';
import { ErrorMessage } from './ErrorMessage';
import { Separator } from './Separator';
import { TextareaWrapper } from './TextareaWrapper';
import { TextareaComponent } from './TextareaComponent';
import {
  DEFAULT_TEAXTAREA_WIDTH,
  DEFAULT_TEAXTAREA_MAX_ROWS,
  DEFAULT_TEAXTAREA_LIMIT,
} from './constants';
import type { LimitLabelCallback, ITextAreaProps } from './interfaces';

const defaultLimitLabel: LimitLabelCallback = (currentValue, { limit = 0 }) =>
  limit ? (
    <>
      {currentValue?.length || '0'} / {limit}
    </>
  ) : null;

export { DEFAULT_TEAXTAREA_MAX_ROWS };
export type { ITextAreaProps };
export const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>((allProps, ref) => {
  const {
    value,
    initialValue = '',
    className,
    dataTestId,
    disabled,
    label,
    resize = 'none',
    onFocus,
    onBlur,
    onChange,
    onHeightChange,
    limit = DEFAULT_TEAXTAREA_LIMIT,
    status,
    elementClassname,
    width = DEFAULT_TEAXTAREA_WIDTH,
    maxRows = DEFAULT_TEAXTAREA_MAX_ROWS,
    aboveLimit = false,
    limitLabel = defaultLimitLabel,
    readOnly,
    errorText = 'Ошибка',
    ...props
  } = allProps;

  const [currentValue, setValue] = useState<string>(initialValue);
  const [focused, setFocus] = useState(false);
  const innerRef = useRef<HTMLTextAreaElement>(null);
  const inputRef = (ref ?? innerRef) as MutableRefObject<HTMLTextAreaElement | null>;

  const handleFocus = useCallback(
    (event: FocusEvent<HTMLTextAreaElement>) => {
      setFocus(true);
      onFocus && onFocus(event);
    },
    [setFocus, onFocus]
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLTextAreaElement>) => {
      setFocus(false);
      onBlur && onBlur(event);
    },
    [setFocus, onBlur]
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(event.target.value);
      onChange && onChange(event);
    },
    [setValue, onChange]
  );

  const limitInfo = useMemo(() => {
    return limitLabel ? limitLabel(currentValue, allProps) : null;
  }, [limitLabel, currentValue, allProps]);
  const maxLength = limit && !aboveLimit ? limit : undefined;
  const displayStatus = status
    ? status
    : limit && currentValue.length > limit
    ? 'error'
    : 'default';
  return (
    <TextareaWrapper
      $width={width}
      disabled={disabled}
      $focused={focused}
      className={className}
      data-test-id={dataTestId}
    >
      {!!label && (
        <>
          <Body2Short>{label}</Body2Short>
          <Separator />
        </>
      )}
      <TextareaComponent
        {...props}
        className={elementClassname}
        value={value ?? currentValue}
        disabled={disabled}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChange={handleChange}
        maxRows={maxRows}
        onHeightChange={onHeightChange}
        inputRef={inputRef}
        maxLength={maxLength}
        $resize={resize}
        $status={displayStatus}
        $focused={focused}
        readOnly={readOnly}
      />
      {(!!limit || status === 'error') && (
        <Footer>
          {status === 'error' && <ErrorMessage> {errorText} </ErrorMessage>}
          {!!limit && <LimitLabel $status={displayStatus}>{limitInfo}</LimitLabel>}
        </Footer>
      )}
    </TextareaWrapper>
  );
});

TextArea.displayName = 'TextArea';
