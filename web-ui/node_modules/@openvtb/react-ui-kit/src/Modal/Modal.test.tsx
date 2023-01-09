import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import * as ContextModule from '../common/theme-context';

import { IconClose } from './IconClose';
import { ModalSize, SIZES_WIDTH, SIZES_HEIGHT } from './constants';
import { ModalComponent } from './ModalComponent';

import { Modal } from './';

const MODAL_HEADER = 'Header';
const MODAL_CONTENT = 'Content';

jest.mock('../common/default-theme', () => ({
  DEFAULT_THEME: {
    boxShadow: {
      16: '',
    },
    color: {
      neutral: {
        white: '',
      },
      opacity: {
        blackHover: '',
      },
    },
  },
}));

jest.spyOn(ContextModule, 'useThemeContext').mockImplementation(() => ({
  color: {
    opacity: {
      blackMedium: '#000000',
    },
  },
}));

jest.mock('../Typography', () => ({
  getTextStyle: () => '',
  // eslint-disable-next-line react/display-name
  H5: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  // eslint-disable-next-line react/display-name
  Body1Long: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('../Icons/service/CloseOutline.svg', () => ({
  // eslint-disable-next-line react/display-name
  ReactComponent: () => <div> x </div>,
}));

describe('Modal', () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((overlay) => overlay && overlay.props.children) as any;
  });

  afterEach(() => {
    (ReactDOM.createPortal as any).mockClear();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render component non opened by default', () => {
    let wrapper = shallow(<Modal header={MODAL_HEADER}>{MODAL_CONTENT}</Modal>);
    expect(wrapper.find(ModalComponent).length).toBe(0);
    wrapper = shallow(
      <Modal opened header={MODAL_HEADER}>
        {MODAL_CONTENT}
      </Modal>
    );
    expect(wrapper.find(ModalComponent).length).toBe(1);
  });

  it('should render component with header and text content by default', () => {
    const wrapper = shallow(
      <Modal opened header={MODAL_HEADER}>
        {MODAL_CONTENT}
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with provided size', () => {
    const sizes: Array<ModalSize> = ['big', 'medium', 'small', 'micro'];
    sizes.forEach((size) => {
      const wrapper = shallow(
        <Modal opened header={MODAL_HEADER} size={size}>
          {MODAL_CONTENT}
        </Modal>
      );
      const modalComponent = wrapper.find(ModalComponent);
      expect(modalComponent.prop('width')).toEqual(SIZES_WIDTH[size]);
      expect(modalComponent.prop('height')).toEqual(SIZES_HEIGHT[size]);
    });
  });

  it('should render component with header and text content including primary button', () => {
    const wrapper = shallow(
      <Modal
        opened
        header={MODAL_HEADER}
        primaryButton={{
          children: 'Primary button',
          onClick: () => {
            /* do nothing */
          },
        }}
      >
        {MODAL_CONTENT}
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with header and text content including primary & secondary button', () => {
    const wrapper = shallow(
      <Modal
        opened
        header={MODAL_HEADER}
        primaryButton={{
          children: 'Primary button',
          onClick: () => {
            /* do nothing */
          },
        }}
        secondaryButton={{
          children: 'Secondary button',
          onClick: () => {
            /* do nothing */
          },
        }}
      >
        {MODAL_CONTENT}
      </Modal>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onRequestClose with stopPropagation when mouse has been clicked on "Close" icon', () => {
    let closeClicked = false;
    let stoppedPropagation = false;
    const clickMouseEventArgs = {
      stopPropagation: () => (stoppedPropagation = true),
    };
    const wrapper = shallow(
      <Modal opened header={MODAL_HEADER} onRequestClose={() => (closeClicked = true)}>
        {MODAL_CONTENT}
      </Modal>
    );
    const closeIcon = wrapper.find(IconClose);
    expect(stoppedPropagation).toBe(false);
    expect(closeClicked).toBe(false);
    closeIcon.simulate('click', clickMouseEventArgs);
    expect(stoppedPropagation).toBe(true);
    expect(closeClicked).toBe(true);
  });
});
