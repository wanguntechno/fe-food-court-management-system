import _ from 'lodash';

import NAV_ITEMS from '../nav_items';
import NavButton from './NavButton';

const NavListClose = () => {
  return (
    <div className="flex flex-col gap-2">
      {NAV_ITEMS.map((item1) =>
        _.flatten(item1.items).map((item2, j) => <NavButton key={j} item={item2} />),
      )}
    </div>
  );
};

export default NavListClose;
