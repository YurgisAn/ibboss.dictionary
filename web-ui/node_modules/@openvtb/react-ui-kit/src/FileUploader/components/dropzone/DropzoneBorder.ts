import { ITheme } from '../../../themes/common';

export const getDashboardStyles = (theme: ITheme, isDragActive: boolean, disabled) => `
    --border-color: ${isDragActive ? theme.color.primary[60] : theme.color.neutral[30]};
    --border-weight: 1px;
    --dash-size: 4px;
    --gap-size: 4px;
    &:hover {
      --border-color: ${disabled ? theme.color.neutral[30] : theme.color.primary[60]}
    }
    &:after {
        content:'';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
            linear-gradient(90deg, var(--border-color) 100%, transparent 100%) top left no-repeat,
            linear-gradient(90deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) top center repeat-x,
            linear-gradient(90deg, var(--border-color) 100%, transparent 100%) top right no-repeat,

            linear-gradient(0deg, var(--border-color) 100%, transparent 100%) top left no-repeat,
            linear-gradient(0deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) center left repeat-y,
            linear-gradient(0deg, var(--border-color) 100%, transparent 100%) bottom left no-repeat,

            linear-gradient(90deg, var(--border-color) 100%, transparent 100%) bottom left no-repeat,
            linear-gradient(90deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) bottom center repeat-x,
            linear-gradient(90deg, var(--border-color) 100%, transparent 100%) bottom right no-repeat,

            linear-gradient(0deg, var(--border-color) 100%, transparent 100%) top right no-repeat,
            linear-gradient(0deg, transparent calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2), var(--border-color) calc(var(--gap-size) / 2 + var(--dash-size)), transparent calc(var(--gap-size) / 2 + var(--dash-size))) center right repeat-y,
            linear-gradient(0deg, var(--border-color) 100%, transparent 100%) bottom right no-repeat;
        background-size: var(--dash-size) var(--border-weight), calc(var(--dash-size) + var(--gap-size)) var(--border-weight), var(--dash-size) var(--border-weight), var(--border-weight) var(--dash-size), var(--border-weight) calc(var(--dash-size) + var(--gap-size)), var(--border-weight) var(--dash-size);
    }
`;
