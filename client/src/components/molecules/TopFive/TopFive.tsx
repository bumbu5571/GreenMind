import React from 'react';
import {
  Box,
  Heading,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axiosInstance from '../../../axiosInstance';

type User = {
  id: number;
  username: string;
  score: number;
};
type Users = User[];

export default function TopFive() {
  const [users, setUsers] = useState<Users>([]);

  useEffect(() => {
    axiosInstance
      .get<Users>(`${import.meta.env.VITE_API}/users`)
      .then((res) => {
        const sortedUsers = res.data
          .sort((a, b) => b.score - a.score)
          .slice(0, 5);
        setUsers(sortedUsers);
      })
      .catch((err) => {
        console.error(err);
        setUsers([]);
      });
  }, []);

  return (
    <>
      {/* <div>Топ пять пользователей</div> */}
      <Box maxW="300px" mx="auto" mt="20px">
        <Heading
          as={'h3'}
          fontSize="xl"
          fontWeight={'normal'}
          textAlign={'center'}
          mb={'1.5rem'}
        >
          Топ 5 пользователей
        </Heading>
        <TableContainer
          border="1px solid #e2e8f0"
          borderRadius="md"
          maxHeight="400px"
          overflowY="auto"
        >
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th textAlign={'center'}>#</Th>
                <Th textAlign={'center'}>Имя</Th>
                <Th textAlign={'center'} isNumeric>
                  Баллы
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map((user, index) => (
                <Tr key={user.id}>
                  <Td textAlign={'center'}>{index + 1}</Td>
                  <Td textAlign={'center'}>{user.username}</Td>
                  <Td textAlign={'center'} isNumeric>
                    {user.score}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
