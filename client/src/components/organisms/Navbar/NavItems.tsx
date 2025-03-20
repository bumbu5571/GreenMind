import { NAV_ITEMS_FOR_COMPANY, NAV_ITEMS_FOR_USERS } from '../../../consts';
import { Link as LinkChakra, Text } from '@chakra-ui/react';
import { useAppSelector } from '../../../redux/hooks';

function NavItems() {
  const user = useAppSelector((store) => store.appSlice.user);

  return (
    <>
      {user.user.isCompany
        ? NAV_ITEMS_FOR_COMPANY.map((navItem) => (
            <LinkChakra key={navItem.label} p={1} href={navItem.href ?? '#'}>
              <Text as={'span'}>{navItem.label}</Text>
            </LinkChakra>
          ))
        : NAV_ITEMS_FOR_USERS.map((navItem) => (
            <LinkChakra key={navItem.label} p={1} href={navItem.href ?? '#'}>
              <Text as={'span'}>{navItem.label}</Text>
            </LinkChakra>
          ))}
    </>
  );
}

export default NavItems;
