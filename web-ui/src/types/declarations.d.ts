import 'styled-components';
import { Color } from '@vtb/ui-kit3/dist/components/themes/common';

declare module 'styled-components' {
    export interface DefaultTheme {
        color: Color;
    }
}

declare global {
    interface Window {
        HINTED_CONFIG?: { server: string; organizationId: string };
    }
}

declare module '*.ttf';
declare module '*.woff';
