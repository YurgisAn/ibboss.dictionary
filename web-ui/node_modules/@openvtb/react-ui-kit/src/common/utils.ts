export const containNode = (mainNode: Element | null, node: any) => {
  do {
    if (mainNode === node) {
      return true;
    }
    if (node) {
      node = node.parentNode;
    }
  } while (node);
  return false;
};

export const equalDates = (date1?: Date | null, date2?: Date | null): boolean => {
  return compareDates(date1, date2) === 0;
};

export const compareDates = (date1?: Date | null, date2?: Date | null): number => {
  if ((date1 === null && date2 === null) || (date1 === undefined && date2 === undefined)) return 0;
  if ((date1 === undefined || date1 === null) && date2 !== undefined && date2 !== null) return -1;
  if ((date2 === undefined || date2 === null) && date1 !== undefined && date1 !== null) return 1;
  return date1 && date2 ? date1.getTime() - date2.getTime() : 0;
};

export const getScrollableParents = (parent: Element) => {
  const parents: Array<Element> = [];
  let currentParent = parent;
  while (currentParent) {
    const computedStyle = window.getComputedStyle(currentParent);
    if (
      computedStyle.getPropertyValue('overflow') === 'auto' ||
      computedStyle.getPropertyValue('overflow') === 'scroll' ||
      computedStyle.getPropertyValue('overflow-x') === 'auto' ||
      computedStyle.getPropertyValue('overflow-x') === 'scroll' ||
      computedStyle.getPropertyValue('overflow-y') === 'auto' ||
      computedStyle.getPropertyValue('overflow-y') === 'scroll'
    ) {
      parents.push(currentParent);
    }
    currentParent = currentParent.parentElement as Element;
  }

  return parents;
};

export const getContainingBlockOffset = (parent: Element) => {
  let currentParent = parent;
  while (currentParent) {
    const computedStyle = window.getComputedStyle(currentParent);
    if (
      computedStyle.getPropertyValue('transform') !== 'none' ||
      computedStyle.getPropertyValue('will-change') === 'transform'
    )
      break;
    currentParent = currentParent.parentElement as Element;
  }

  const parentTop = (currentParent && currentParent.getBoundingClientRect().top) || 0;
  const parentLeft = (currentParent && currentParent.getBoundingClientRect().left) || 0;

  return { parentTop, parentLeft };
};
