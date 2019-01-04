import Store from './store';
import createPlaceholders from './middle/placeholders';
import createMiddle from './middle/create';
import createParents from './parents/create';
import createChildren from './children/create';
import connectors from './connectors';
import correctPositions from './utils/correctPositions';
import getCanvasSize from './utils/getCanvasSize';
import { IFamilyNode, IFamilyData } from './types';

import hasHiddenRelatives from './utils/hasHiddenRelatives';
export { hasHiddenRelatives };

export default (nodes: IFamilyNode[], rootId: string): IFamilyData => {
  const store = new Store(nodes, rootId);

  createPlaceholders(store);
  createMiddle(store);
  createParents(store);
  createChildren(store);
  correctPositions(store);

  const families = [...store.families.values()];

  return {
    families: families,
    canvas: getCanvasSize(store),
    connectors: connectors(families),
  };
}
