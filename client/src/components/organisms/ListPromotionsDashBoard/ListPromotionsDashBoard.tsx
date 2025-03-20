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
import { Promotion } from '../../../types';

type TypeListPromotionsDashBoard = {
  promotionsCompany: Promotion[];
  clickHandler: (event: React.MouseEvent<HTMLTableElement>) => void;
  userPromotions: Promotion[];
};

function ListPromotionsDashBoard({
  userPromotions,
  promotionsCompany,
  clickHandler,
}: TypeListPromotionsDashBoard) {
  return (
    <TableContainer borderRadius="2xl" overflow="hidden" bg="brand.100">
      <Table variant="simple" onClick={clickHandler}>
        <TableCaption fontSize="xl" placement="top" color="brand.250">
          Акции компании{/* {userPromotions.name} */}
        </TableCaption>
        <Thead>
          <Tr>
            <Th fontSize="sm" color="brand.250">
              Название
            </Th>
            <Th fontSize="sm" color="brand.250">
              Категория
            </Th>
            <Th fontSize="sm" color="brand.250">
              Баллы
            </Th>
            <Th textAlign="center" fontSize="sm" color="brand.250">
              Дата начала
            </Th>
            <Th textAlign="center" fontSize="sm" color="brand.250">
              Время
            </Th>
            <Th textAlign="center" fontSize="sm" color="brand.250">
              Дата завершения
            </Th>
            <Th textAlign="center" fontSize="sm" color="brand.250">
              Время
            </Th>
          </Tr>
        </Thead>
        <Tbody fontSize={{ base: '14px', lg: 'inherit' }}>
          {promotionsCompany.map((promotion) => {
            const dateStarn = new Date(promotion.date);
            const dateEnd = new Date(promotion.dateEnd);
            return (
              <Tr key={promotion.id}>
                <Td
                  className="promotion"
                  id={promotion.id.toString()}
                  _hover={{
                    cursor: 'pointer',
                    transform: 'scale(1.1, 1.1) translate(5%)',
                  }}
                  color={
                    userPromotions.find((el) => el.id === promotion.id)
                      ? 'brand.200'
                      : 'brand.250'
                  }
                >
                  {promotion.name}
                </Td>
                <Td color="brand.250">{promotion.category}</Td>
                <Td color="brand.250">{promotion.score}</Td>
                <Td textAlign="center" color="brand.250">
                  {dateStarn.toLocaleString('ru-RU', { dateStyle: 'short' })}
                </Td>
                <Td textAlign="center" color="brand.250">
                  {dateStarn.toLocaleString('ru-RU', { timeStyle: 'short' })}
                </Td>
                <Td textAlign="center" color="brand.250">
                  {dateEnd.toLocaleString('ru-RU', { dateStyle: 'short' })}
                </Td>
                <Td textAlign="center" color="brand.250">
                  {dateEnd.toLocaleString('ru-RU', { timeStyle: 'short' })}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ListPromotionsDashBoard;
