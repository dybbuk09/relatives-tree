import Store from '../store';
import { Family } from '../types';
import { min, prop, withType } from './index';

export default (store: Store): Store => {
  const families = store.familiesArray;

  const vShift = min(families.map(prop('top'))) * -1;
  if (vShift !== 0) families.forEach(family => family.top += vShift);

  const rootChild = families.find(f => f.main) as Family; // TODO
  const rootParent = families.find(f => f.cid === rootChild.id);

  if (rootParent) {
    const cUnit = rootChild.parents[0];
    const pUnit = rootParent.children[0];

    const diff = (rootParent.left + pUnit.pos) - (rootChild.left + cUnit.pos);

    if (diff > 0) families
      .filter(withType('child', 'root'))
      .forEach(family => family.left += diff);
    else if (diff < 0) families
      .filter(withType('parent'))
      .forEach(family => family.left += diff * -1);

    const hShift = min(families.map(prop('left')));
    if (hShift > 0) families.forEach(family => family.left -= hShift);
  }

  const totalShift = min(families.map(f => f.left)) * -1;
  if (totalShift !== 0) families.forEach(family => family.left += totalShift);

  return store;
};
