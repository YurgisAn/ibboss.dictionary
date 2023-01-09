import React from 'react';
import { shallow, mount } from 'enzyme';
import { render, fireEvent } from '@testing-library/react';

import { FILE_MAX_SIZE_ERROR, FILE_EXTENSION_ERROR } from './constants';
import { FileCloseIcon } from './components/file/FileCloseIcon';
import { FileErrorText } from './components/file/FileErrorText';
import { FileErrorIcon } from './components/file/FileErrorIcon';
import { ErrorText } from './components/container/ErrorText';

import { FileUploader } from './';

const DEFAULT_MAX_TOTAL_SIZE = 20 * 1024 * 1024;

jest.mock('../common', () => ({
  DEFAULT_THEME: {
    borderRadius: '',
    color: {
      error: {
        60: '',
      },
      neutral: {
        10: '',
        30: '',
      },
      primary: {
        60: '',
      },
      success: {
        20: '',
      },
      opacity: {
        blackHover: '',
      },
    },
  },
  Z_INDEXES: {
    TOOLTIP: 777,
  },
}));

describe('FileUploader', () => {
  const testFile = new File([JSON.stringify({ ping: true })], 'ping.json', {
    type: 'application/json',
  });

  beforeEach(() => {
    // Remove it when DropZone console error will be fixed
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('should correctly render', () => {
    const wrapper = shallow(<FileUploader maxTotalSize={DEFAULT_MAX_TOTAL_SIZE} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should correctly render if disabled', () => {
    const wrapper = shallow(<FileUploader disabled maxTotalSize={DEFAULT_MAX_TOTAL_SIZE} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render with mobile prop', () => {
    const wrapper = shallow(<FileUploader maxTotalSize={DEFAULT_MAX_TOTAL_SIZE} mobile />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChange on file drops', async () => {
    const mockChange = jest.fn();
    const data = mockData([testFile]);
    const ui = <FileUploader onChange={mockChange} maxTotalSize={DEFAULT_MAX_TOTAL_SIZE} />;
    await initDrop(ui, data);
    expect(mockChange).toHaveBeenCalled();
  });

  it('should not call onChange on file drops, with mobile prop', async () => {
    const mockChange = jest.fn();
    const data = mockData([testFile]);
    const ui = <FileUploader onChange={mockChange} maxTotalSize={DEFAULT_MAX_TOTAL_SIZE} mobile />;
    await initDrop(ui, data);
    expect(mockChange).toBeCalledTimes(0);
  });

  it('should call onChange with limited files count', async () => {
    const mockChange = jest.fn();
    const secondFile = new File([JSON.stringify({ ping: true })], 'pinger.json', {
      type: 'application/json',
    });
    const data = mockData([testFile, secondFile]);
    const ui = (
      <FileUploader maxFiles={1} onChange={mockChange} maxTotalSize={DEFAULT_MAX_TOTAL_SIZE} />
    );
    await initDrop(ui, data);
    expect(mockChange).toHaveBeenCalledWith([{ data: testFile, name: testFile.name }]);
  });

  it('should call onChange with error because of max size', async () => {
    const mockChange = jest.fn();
    const data = mockData([testFile]);
    const ui = <FileUploader maxSize={1} onChange={mockChange} maxTotalSize={1} />;
    await initDrop(ui, data);
    expect(mockChange).toHaveBeenCalledWith([
      { data: testFile, error: FILE_MAX_SIZE_ERROR, name: testFile.name },
    ]);
  });

  it('should call onRemoveClick', () => {
    const mockRemove = jest.fn();
    const testFile = { name: 'testFile.jpg' };
    const wrapper = mount(
      <FileUploader
        files={[testFile]}
        onRemoveClick={mockRemove}
        maxTotalSize={DEFAULT_MAX_TOTAL_SIZE}
      />
    );
    wrapper.find(FileCloseIcon).simulate('click');
    expect(mockRemove).toHaveBeenCalledWith(testFile, 0);
  });

  it('should render file error', () => {
    const testFile = { name: 'testFile.jpg', error: 'some error text' };
    const wrapper = mount(
      <FileUploader files={[testFile]} maxTotalSize={DEFAULT_MAX_TOTAL_SIZE} />
    );
    expect(wrapper.find(FileErrorText).text()).toEqual(testFile.error);
    expect(wrapper.find(FileErrorIcon).length).toEqual(1);
  });

  it('should render dropzone error', () => {
    const errorText = 'some error';
    const wrapper = mount(<FileUploader error={errorText} maxTotalSize={DEFAULT_MAX_TOTAL_SIZE} />);
    expect(wrapper.find(ErrorText).text()).toEqual(errorText);
  });

  it('should call onChange with error if file extension not correct', async () => {
    const mockChange = jest.fn();
    const data = mockData([testFile]);
    const ui = (
      <FileUploader
        accept={['image/png']}
        onChange={mockChange}
        maxTotalSize={DEFAULT_MAX_TOTAL_SIZE}
      />
    );
    await initDrop(ui, data);
    expect(mockChange).toHaveBeenCalledWith([
      { data: testFile, error: FILE_EXTENSION_ERROR, name: testFile.name },
    ]);
  });
});

async function initDrop(ui: any, data: any) {
  const { container } = render(ui);
  const dropzone = (container.querySelector('input') as any).parentElement;
  dispatchEvt(dropzone, 'drop', data);
  await flushPromises(ui, container);
}

function flushPromises(ui: any, container: any) {
  return new Promise((resolve) =>
    setImmediate(() => {
      render(ui, { container });
      resolve(container);
    })
  );
}

function dispatchEvt(node: any, type: any, data: any) {
  const event = new Event(type, { bubbles: true });
  Object.assign(event, data);
  fireEvent(node, event);
}

function mockData(files: any) {
  return {
    dataTransfer: {
      files,
      items: files.map((file: any) => ({
        kind: 'file',
        type: file.type,
        getAsFile: () => file,
      })),
      types: ['Files'],
    },
  };
}
