import type { ITheme } from '../themes';

import { kindStyles } from './kind-styles';
import type { Kind } from './Button';

export const getKindStyle = ({
  active,
  disabled,
  kind,
  theme,
}: {
  active: boolean;
  disabled: boolean;
  kind: Kind;
  theme: ITheme;
}) => kindStyles[kind]({ active, disabled, theme });
