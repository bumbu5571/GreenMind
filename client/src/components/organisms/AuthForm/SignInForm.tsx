import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  Heading,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Inputs } from '../../../types';

function SignInForm({
  onSubmit,
  title,
  error,
}: {
  onSubmit: (inputs: Inputs) => void;
  title: string;
  error: string;
}) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  return (
    <>
      <Stack spacing={4}>
        <Heading
          color={'gray.800'}
          fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
        >
          {title}
        </Heading>
        <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
          Чтобы полностью использовать возможности платформы и быть в курсе
          последних экологических инициатив, мы рекомендуем вам войти в свой
          личный кабинет.
        </Text>
      </Stack>
      <Box as={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <FormControl isInvalid={Boolean(errors.email)}>
            <Input
              type="email"
              id="email"
              placeholder="Эл.почта"
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              {...register('email', {
                required: 'Обязательное поле',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message:
                    'Введенное значение не соответствует формату электронной почты: example@example.com',
                },
              })}
            />
            <FormErrorMessage>
              {errors.email && (
                <Box textAlign={'left'}>{errors.email.message}</Box>
              )}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.password)}>
            <Input
              type="password"
              id="password"
              placeholder="Пароль"
              bg={'gray.100'}
              border={0}
              color={'gray.500'}
              _placeholder={{
                color: 'gray.500',
              }}
              {...register('password', {
                required: 'Обязательное поле',
                minLength: {
                  value: 5,
                  message: 'Минимальное количество символов – 5',
                },
              })}
            />
            <FormErrorMessage>
              {errors.password && (
                <Box textAlign={'left'}>{errors.password.message}</Box>
              )}
            </FormErrorMessage>
          </FormControl>
          <Stack
            direction={{ base: 'column', sm: 'row' }}
            align={'start'}
            justify={'space-between'}
          >
            <Checkbox
              id="isCompany"
              colorScheme="customGreen"
              {...register('isCompany', {})}
            >
              Войти как компания?
            </Checkbox>
          </Stack>
        </Stack>
        {error && (
          <Box mt={3} textAlign={'left'} color={'red.500'}>
            {error}
          </Box>
        )}
        <Button
          mt={8}
          w={'full'}
          colorScheme="customGreen"
          rounded={'full'}
          type="submit"
        >
          Войти
        </Button>
      </Box>
    </>
  );
}

export default SignInForm;
