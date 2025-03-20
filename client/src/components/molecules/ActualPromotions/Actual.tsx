import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  TableCaption,
  Heading,
} from '@chakra-ui/react';
import { Promotion } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';

export default function Actual() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/participants`)
      .then(({ data }) => {
        const today = new Date();
        const filteredPromotions = data.filter((promotion: Promotion) => {
          const promotionDate = new Date(promotion.dateEnd);
          return promotionDate >= today;
        });
        setPromotions(filteredPromotions);
      })
      .catch((error) =>
        console.error('Упс! Ошибка при загрузке акций:', error)
      );
  }, []);

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };

    return new Date(date).toLocaleString('ru-RU', options).replace(',', '');
  };

  const navigate = useNavigate();
  const promopageClickHandler = (id: number) => {
    navigate(`/promopage/${id}`);
  };

  return (
    <>
      <Box maxW="650px" mx="auto" mt="20px">
        <Heading
          as={'h3'}
          fontSize="xl"
          fontWeight={'normal'}
          textAlign={'center'}
          mb={'1.5rem'}
        >
          Актуальные
        </Heading>
        <TableContainer
          maxHeight="200px"
          overflowY="auto"
          border="1px solid #e2e8f0"
          borderRadius="lg"
          whiteSpace={'normal'}
        >
          <Table
            variant="striped"
            // sx={{
            //   'tbody tr:nth-of-type(odd)': {
            //     backgroundColor: '#f7f7f7',
            //   },
            //   'tbody tr:nth-of-type(even)': {
            //     backgroundColor: '#8BD2A0',
            //   },
            // }}
            colorScheme='customGreen'
            width={'full'}
          >
            <Thead>
              <Tr>
                <Th minWidth="30px" textAlign={'center'}>
                  #
                </Th>
                <Th minWidth="150px" textAlign={'center'}>
                  Название акции
                </Th>
                <Th minWidth="150px" textAlign={'center'}>
                  Дата завершения
                </Th>
              </Tr>
            </Thead>
            <Tbody fontSize={{ base: '14px', sm: 'inherit' }}>
              {promotions.length === 0 ? (
                <Tr>
                  <Td colSpan={3} textAlign="center">
                    У вас пока нет актуальных акций
                  </Td>
                </Tr>
              ) : (
                promotions.map((promotion, index) => (
                  <Tr key={`dynamic-${promotion.id || index}`}>
                    <Td textAlign={'center'} verticalAlign={'middle'}>
                      {index + 1}
                    </Td>
                    <Td
                      onClick={() => promopageClickHandler(promotion.id)}
                      _hover={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                      textAlign={'center'}
                      verticalAlign={'middle'}
                    >
                      {promotion.name}
                    </Td>
                    <Td textAlign={'center'} verticalAlign={'middle'}>
                      {promotion.dateEnd
                        ? formatDate(promotion.dateEnd)
                        : 'Не указана'}
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
