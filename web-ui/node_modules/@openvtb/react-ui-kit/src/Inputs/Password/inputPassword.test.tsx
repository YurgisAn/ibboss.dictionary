import { runCommonInputTest, runCommonInputOnChangeTest } from '../common/test';
import { Input } from '../../Inputs';

jest.mock('../../common', () => ({
  DEFAULT_THEME: {},
  Z_INDEXES: {
    INFORMER: 777,
  },
}));

describe('Input.Password', () => {
  runCommonInputTest(Input.Password);

  runCommonInputOnChangeTest(Input.Password, '123qwerty', '123qwerty');
});
