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
import { Company } from '../../types';
import { useAppSelector } from '../../redux/hooks';

type TypeListCompanyDashBorad = {
  companies: Company[];
  clickHandler: (event: React.MouseEvent<HTMLTableElement>) => void;
};

function ListCompanyDashBorad_CC({
  companies,
  clickHandler,
}: TypeListCompanyDashBorad) {
  const user = useAppSelector((store) => store.appSlice.user);

  const filteredCompanies = companies.filter(
    (company) => company.name === user.user.name
  );

  return (
    <TableContainer borderRadius="lg" overflow="hidden" whiteSpace={'normal'}>
      <Table variant="striped" onClick={clickHandler} colorScheme="customGreen">
        <TableCaption fontSize="xl" placement="top" mb={'1.5rem'}>
          Основная информация
        </TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center">Название</Th>
            <Th textAlign="center">Рейтинг</Th>
            <Th textAlign="center">Количество акций</Th>
            <Th textAlign="center">Количество участников</Th>
          </Tr>
        </Thead>
        <Tbody fontSize={{ base: '14px', lg: 'inherit' }}>
          {filteredCompanies.map((company, i) => (
            <Tr key={company.id}>
              <Td
                textAlign="center"
                className="company"
                id={company.id.toString()}
                _hover={{
                  cursor: 'pointer',
                  transform: 'scale(1.25, 1.25) translate(10%)',
                }}
              >
                {company.name}
              </Td>
              <Td textAlign="center">{i + 1}</Td>
              <Td textAlign="center">{company.Promotions.length}</Td>
              <Td textAlign="center">
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

export default ListCompanyDashBorad_CC;
