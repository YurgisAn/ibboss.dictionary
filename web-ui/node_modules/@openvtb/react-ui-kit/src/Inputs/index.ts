import { TimePicker } from '../TimePicker';

import { InputText } from './Text';
import { InputPassword } from './Password';
import { InputSuggest } from './Suggest';
import { InputInformer } from './Informer';
import { InputNumber } from './Number';
import { InputMask } from './Mask';
import { InputRange } from './InputRange';
import { InputPhoneCountry } from './PhoneCountry';
export { IInputProps } from './BaseField';
export { IInputMaskProps } from './Mask';
export type { IOptionSuggest } from './Suggest';

export const Input = {
  Text: InputText,
  Password: InputPassword,
  Number: InputNumber,
  Mask: InputMask,
  Suggest: InputSuggest,
  Range: InputRange,
  Informer: InputInformer,
  PhoneCountry: InputPhoneCountry,
  Time: TimePicker,
};
