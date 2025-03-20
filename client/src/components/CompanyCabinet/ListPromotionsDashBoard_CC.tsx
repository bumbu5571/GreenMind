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
import { Promotion } from '../../types';

type TypeListPromotionsDashBoard = {
  promotionsCompany: Promotion[];
  clickHandler: (event: React.MouseEvent<HTMLTableElement>) => void;
  userPromotions: Promotion[];
};

function ListPromotionsDashBoard_CC({
  userPromotions,
  promotionsCompany,
  clickHandler,
}: TypeListPromotionsDashBoard) {
  return (
    <TableContainer borderRadius="lg" overflow="hidden" whiteSpace={'normal'}>
      <Table variant="striped" onClick={clickHandler} colorScheme="customGreen">
        <TableCaption fontSize="xl" placement="top">
          Акции
        </TableCaption>
        <Thead>
          <Tr>
            <Th textAlign="center">Название</Th>
            <Th textAlign="center">Категория</Th>
            <Th textAlign="center">Баллы</Th>
            <Th textAlign="center">Дата</Th>
            <Th textAlign="center">Время</Th>
          </Tr>
        </Thead>
        <Tbody fontSize={{ base: '14px', lg: 'inherit' }}>
          {promotionsCompany.map((promotion) => {
            const date = new Date(promotion.date);
            return (
              <Tr key={promotion.id}>
                <Td
                  className="promotion"
                  id={promotion.id.toString()}
                  _hover={{
                    cursor: 'pointer',
                    transform: 'scale(1.1, 1.1) translate(5%)',
                  }}
                  color={'dark'}
                  textDecoration={
                    userPromotions.find((el) => el.id === promotion.id)
                      ? 'underline'
                      : 'none'
                  }
                  verticalAlign={'middle'}
                  textAlign="center"
                >
                  {promotion.name}
                </Td>
                <Td verticalAlign={'middle'} textAlign="center">
                  {promotion.category}
                </Td>
                <Td verticalAlign={'middle'} textAlign="center">
                  {promotion.score}
                </Td>
                <Td verticalAlign={'middle'} textAlign="center">
                  {date.toLocaleString('ru-RU', { dateStyle: 'short' })}
                </Td>
                <Td verticalAlign={'middle'} textAlign="center">
                  {date.toLocaleString('ru-RU', { timeStyle: 'short' })}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ListPromotionsDashBoard_CC;
