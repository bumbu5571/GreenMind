import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Company } from '../../../types';

type TypeListCompanyDashBorad = {
  companies: Company[];
  clickHandler: (event: React.MouseEvent<HTMLTableElement>) => void;
};

function ListCompanyDashBorad({
  companies,
  clickHandler,
}: TypeListCompanyDashBorad) {
  return (
    <TableContainer
      borderRadius="2xl"
      overflow="hidden"
      whiteSpace={'normal'}
      bg="brand.100"
    >
      <Table variant="simple" onClick={clickHandler}>
        <TableCaption fontSize="xl" placement="top" color="brand.250">
          Компании
        </TableCaption>
        <Thead>
          <Tr>
            <Th fontSize="sm" color="brand.250">
              Название
            </Th>
            <Th fontSize="sm" textAlign="center" color="brand.250">
              Рейтинг
            </Th>
            <Th fontSize="sm" textAlign="center" color="brand.250">
              Количество акций
            </Th>
            <Th fontSize="sm" textAlign="center" color="brand.250">
              Количество участников
            </Th>
          </Tr>
        </Thead>
        <Tbody fontSize={{ base: '14px', lg: 'inherit' }}>
          {companies.map((company, i) => (
            <Tr key={company.id}>
              <Td
                className="company"
                id={company.id.toString()}
                _hover={{
                  cursor: 'pointer',
                  transform: 'scale(1.25, 1.25) translate(10%)',
                }}
                color="brand.250"
              >
                {company.name}
              </Td>
              <Td textAlign="center" color="brand.250">
                {i + 1}
              </Td>
              <Td textAlign="center" color="brand.250">
                {company.Promotions.length}
              </Td>
              <Td textAlign="center" color="brand.250">
                {company.Promotions.reduce(
                  (acc, val) => acc + val.Users.length,
                  0
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ListCompanyDashBorad;
