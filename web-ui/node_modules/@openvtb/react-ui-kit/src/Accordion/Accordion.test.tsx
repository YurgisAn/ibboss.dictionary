import React from 'react';
import { shallow } from 'enzyme';

import { Accordion } from '../Accordion';
import { KEY_CODES } from '../common';
import type { IAccordionProps } from '../Accordion';

jest.mock('../common', () => ({
  DEFAULT_THEME: {},
  KEY_CODES: {
    ENTER: 13,
    SPACEBAR: 32,
  },
}));

describe('Accordion', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const requiredProps: IAccordionProps = {
    list: [
      {
        id: 0,
        title: 'Title',
        content: 'Content',
      },
    ],
    onChange: jest.fn(),
  };

  it('should render component with required properties', () => {
    const wrapper = shallow(<Accordion {...requiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render small component with required properties', () => {
    const wrapper = shallow(<Accordion small {...requiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render all items from list', () => {
    const item = requiredProps.list[0];
    const itemsList = new Array(4).fill(item, 0, 4);

    const wrapper = shallow(<Accordion {...requiredProps} list={itemsList} />);
    expect(wrapper.children()).toHaveLength(itemsList.length);
  });

  it("should render item expanded if it is specified in item's configuration", () => {
    const item = requiredProps.list[0];
    const expandedItem = {
      ...item,
      expanded: true,
    };

    const wrapper = shallow(<Accordion {...requiredProps} list={[item, expandedItem]} />);

    const renderedItem = wrapper.childAt(0).dive();
    const renderedOpenedItem = wrapper.childAt(1).dive();

    expect(renderedItem.children()).toHaveLength(1);
    expect(renderedOpenedItem.children()).toHaveLength(2);
  });

  it("should call onChange with item's id and new expanded if user clicks on it", () => {
    const wrapper = shallow(<Accordion {...requiredProps} />);

    const renderedItem = wrapper.childAt(0).dive();
    expect(renderedItem.children()).toHaveLength(1);

    const header = renderedItem.childAt(0);
    header.simulate('click');

    const { list, onChange } = requiredProps;
    expect(onChange).toHaveBeenCalledWith(list[0].id, !list[0].expanded);
  });

  it("should call onChange with item's id and new expanded if user presses enter or space keys on focused item", () => {
    [KEY_CODES.ENTER, KEY_CODES.SPACEBAR].forEach((keyCode) => {
      const wrapper = shallow(<Accordion {...requiredProps} />);

      const renderedItem = wrapper.childAt(0).dive();
      expect(renderedItem.children()).toHaveLength(1);

      const header = renderedItem.childAt(0);
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      header.simulate('keydown', { keyCode, preventDefault: () => {} });

      const { list, onChange } = requiredProps;
      expect(onChange).toHaveBeenCalledWith(list[0].id, !list[0].expanded);
    });
  });
});
