import NAV_ITEMS from '../nav_items';
import NavItemOpen from './NavItem';

const NavListOpen = () => {
  return (
    <div className="flex flex-col gap-5">
      {NAV_ITEMS.map((navItem, index) => (
        <NavItemOpen key={index} navItem={navItem} />
      ))}
    </div>
  );
};

export default NavListOpen;
