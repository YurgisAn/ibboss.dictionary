export const getChipColor = (theme, disabled, selected) => {
  if (disabled && selected) return theme.color.primary[40];
  if (disabled) return theme.color.neutral[30];
  if (selected) return theme.color.primary[70];

  return theme.color.neutral[90];
};

export const getChipBackgroundColor = (theme, disabled, selected) => {
  if (disabled && selected) return theme.color.primary[20];
  if (disabled) return theme.color.neutral[10];
  if (selected) return theme.color.primary[20];

  return theme.color.neutral[10];
};

export const getChipHoverColor = (theme, selected) => {
  if (selected) return theme.color.primary[70];

  return theme.color.neutral[90];
};

export const getChipHoverBackgroundColor = (theme, selected) => {
  if (selected) return theme.color.primary[30];

  return theme.color.neutral[20];
};

export const getIconColor = (theme, selected, disabled) => {
  if (disabled && selected) return theme.color.primary[40];
  if (disabled) return theme.color.neutral[30];
  if (selected) return theme.color.primary[70];

  return theme.color.neutral[50];
};
