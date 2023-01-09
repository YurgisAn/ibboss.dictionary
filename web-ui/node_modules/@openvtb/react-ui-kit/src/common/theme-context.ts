import { useContext } from 'react';
import { ThemeContext } from 'styled-components';

import { DEFAULT_THEME } from './default-theme';

export const useThemeContext = () => useContext(ThemeContext) || DEFAULT_THEME;
