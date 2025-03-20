import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
  Box,
} from '@chakra-ui/react';
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { userUpdate } from '../../../redux/thunkActions';
import { Inputs } from '../../../types';

type TypeInputs = {
  name?: string;
  username?: string;
  email: string;
};

export default function MyProfile() {
  const [userData, setUserData] = useState<TypeInputs>({
    name: '',
    username: '',
    email: '',
  });

  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.appSlice.user);
  const toast = useToast();

  useEffect(() => {
    if (user?.user) {
      if (user.user.isCompany) {
        setUserData({
          name: user.user.name,
          email: user.user.email,
          isCompany: true,
        });
      } else {
        setUserData({
          username: user.user.username,
          email: user.user.email,
          isCompany: false,
        });
      }
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdate = async (updatedData: TypeInputs) => {
    dispatch(userUpdate(updatedData as Inputs))
      .unwrap()
      .then((updatedUser) => {
        setUserData(updatedUser.user);
        toast({
          title: 'Успех!',
          description: 'Ваши данные успешно обновлены.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: 'Ошибка!',
          description: error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(userData.email)) {
      alert(
        'Некорректный формат электронной почты. Пример: example@example.com'
      );
      return;
    }

    handleUpdate(userData);
  };

  return (
    <>
      {user.user.id !== 0 ? (
        <Flex
          justify={'center'}
          backgroundImage="linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/204874815.jpeg')"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          p={3}
        >
          <Stack
            spacing={4}
            w={'full'}
            maxW={'md'}
            // eslint-disable-next-line react-hooks/rules-of-hooks
            bg={useColorModeValue('white', 'gray.700')}
            rounded={'xl'}
            boxShadow={'lg'}
            p={6}
            my={16}
            maxWidth={800}
          >
            <Heading
              fontSize={{ base: 'xl', sm: 'xl', md: '2xl' }}
              textAlign={'center'}
            >
              Редактировать профиль
            </Heading>
            <Box as={'form'} onSubmit={handleSubmit}>
              <Stack spacing={4}>
                {!user.user.isCompany && (
                  <FormControl id="userName">
                    <FormLabel>Имя</FormLabel>
                    <Input
                      onChange={handleChange}
                      name="username"
                      value={userData?.username}
                      color={'gray.500'}
                      _placeholder={{ color: 'gray.500' }}
                      type="text"
                      bg={'gray.100'}
                      border={0}
                    />
                  </FormControl>
                )}
                {user.user.isCompany && (
                  <FormControl id="companyName">
                    <FormLabel>Название:</FormLabel>
                    <Input
                      onChange={handleChange}
                      name="name"
                      value={userData?.name}
                      _placeholder={{ color: 'gray.500' }}
                      type="text"
                      bg={'gray.100'}
                      color={'gray.500'}
                      border={0}
                    />
                  </FormControl>
                )}
                <FormControl id="email">
                  <FormLabel>Email:</FormLabel>
                  <Input
                    onChange={handleChange}
                    name="email"
                    value={userData.email}
                    _placeholder={{ color: 'gray.500' }}
                    type="email"
                    bg={'gray.100'}
                    color={'gray.500'}
                    border={0}
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Текущий пароль:</FormLabel>
                  <Input
                    onChange={handleChange}
                    name="currentPassword"
                    placeholder=""
                    _placeholder={{ color: 'gray.500' }}
                    type="password"
                    bg={'gray.100'}
                    color={'gray.500'}
                    border={0}
                  />
                </FormControl>
                <FormControl id="password" /* isRequired */>
                  <FormLabel>Новый пароль:</FormLabel>
                  <Input
                    onChange={handleChange}
                    name="newPassword"
                    placeholder=""
                    _placeholder={{ color: 'gray.500' }}
                    type="password"
                    bg={'gray.100'}
                    color={'gray.500'}
                    border={0}
                  />
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                  <Button
                    mt={8}
                    w={'full'}
                    fontWeight={600}
                    bg={'accent'}
                    type="submit"
                    rounded={'full'}
                    colorScheme="customGreen"
                  >
                    Обновить
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      ) : (
        <Heading
          lineHeight={1.1}
          color={'gray.800'}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
          textAlign="center"
        >
          Идет загрузка
        </Heading>
      )}
    </>
  );
}
