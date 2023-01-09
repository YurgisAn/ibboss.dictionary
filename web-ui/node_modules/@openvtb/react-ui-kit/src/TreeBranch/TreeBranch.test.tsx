/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/display-name */
import React from 'react';
import { shallow } from 'enzyme';

import { TreeBranch } from '../TreeBranch';
import type { ITreeBranchProps } from '../TreeBranch';

jest.mock('../Checkbox', () => ({
  Checkbox: ({ checked, onChange }) => <div onClick={(event) => onChange(event, !checked)} />,
}));

describe('TreeBranch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const requiredProps: ITreeBranchProps = {
    id: 0,
    label: 'Foo',
  };

  const childProps: ITreeBranchProps = {
    id: 1,
    label: 'Bar',
  };

  it('should render component with required props', () => {
    const wrapper = shallow(<TreeBranch {...requiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with different sizes', () => {
    const sizes: Array<ITreeBranchProps['size']> = ['big', 'small'];

    sizes.forEach((size) => {
      const wrapper = shallow(<TreeBranch size={size} {...requiredProps} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('should render component as header', () => {
    const wrapper = shallow(<TreeBranch header {...requiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with toggle if children are provided', () => {
    const wrapper = shallow(
      <TreeBranch {...requiredProps}>
        <TreeBranch {...childProps} />
      </TreeBranch>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should show children if expanded prop is true', () => {
    const wrapper = shallow(
      <TreeBranch expanded {...requiredProps}>
        <TreeBranch {...childProps} />
      </TreeBranch>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with icon', () => {
    const Icon = () => <div>Icon</div>;
    const wrapper = shallow(<TreeBranch icon={<Icon />} {...requiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component with indeterminate checkbox', () => {
    const wrapper = shallow(<TreeBranch indeterminate {...requiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render component without checkbox', () => {
    const wrapper = shallow(<TreeBranch hideCheckbox {...requiredProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onCheck with id and new checked when user clicks on checkbox', () => {
    const checked = false;
    const onCheck = jest.fn();
    const wrapper = shallow(<TreeBranch checked={checked} onCheck={onCheck} {...requiredProps} />);

    const checkbox = wrapper.childAt(0).childAt(0).dive();
    checkbox.simulate('click');

    expect(onCheck).toHaveBeenCalledWith(requiredProps.id, !checked);
  });

  it('should call onExpand with id and new expanded when user clicks on toggle', () => {
    const expanded = false;
    const onExpand = jest.fn();
    const wrapper = shallow(
      <TreeBranch expanded={expanded} onExpand={onExpand} {...requiredProps}>
        <TreeBranch {...childProps} />
      </TreeBranch>
    );

    const toggle = wrapper.childAt(0).childAt(0).dive();
    toggle.simulate('click');

    expect(onExpand).toHaveBeenCalledWith(requiredProps.id, !expanded);
  });
});
