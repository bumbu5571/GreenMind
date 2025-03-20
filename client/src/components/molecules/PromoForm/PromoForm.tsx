import { useState, Dispatch, SetStateAction } from 'react';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Textarea,
  Box,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Promotion, PromotionInputs } from '../../../types';
import axiosInstance from '../../../axiosInstance';

type TypePromoForm = {
  setActivePromotions: Dispatch<SetStateAction<Promotion[]>>;
  setArchivalPromotions: Dispatch<SetStateAction<Promotion[]>>;
};

export default function PromoForm({
  setActivePromotions,
  setArchivalPromotions,
}: TypePromoForm) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const toast = useToast();

  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const onSubmit = async (inputs: PromotionInputs) => {
    // react-hook-form при загрузке файлов создает FileList, а мы работаем с обычным File
    // поэтому достаем из FileList нулевой файл, который будем передавать на сервер
    inputs = { ...inputs, img: inputs.img[0] };

    try {
      const response = await axiosInstance.post(
        `${import.meta.env.VITE_API}/promotions`,
        inputs,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );

      if (response.status === 201) {
        const date = new Date();
        if (new Date(response.data.date) > date) {
          setActivePromotions((prev) => [...prev, response.data]);
        } else {
          setArchivalPromotions((prev) => [...prev, response.data]);
        }

        reset();
        setServerErrorMessage('');

        toast({
          title: 'Событие создано!',
          description: 'Теперь можете увидеть его в своем списке',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });

        // @TODO: тут редирект на таб со всеми акциями
      }
    } catch (err) {
      console.log('err', err);
      setServerErrorMessage(
        err.response?.data?.message || 'Ошибка при добавлении акции'
      );
    }
  };

  return (
    <>
      <Flex
        justify={'center'}
        backgroundImage="linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/images/createPromo.jpeg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        p={3}
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
          maxWidth={800}
        >
          <Heading
            fontSize={{ base: 'xl', sm: 'xl', md: '2xl' }}
            textAlign={'center'}
          >
            Создать акцию
          </Heading>
          <Box
            as={'form'}
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
          >
            <Stack spacing={4}>
              <FormControl isInvalid={Boolean(errors.name)}>
                <FormLabel>Название акции:</FormLabel>
                <Input
                  type="text"
                  id="name"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  placeholder="Введите название"
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  {...register('name', {
                    required: 'Обязательное поле',
                  })}
                />
                <FormErrorMessage>
                  {errors.name && (
                    <Box textAlign={'left'}>{errors.name.message}</Box>
                  )}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.date)}>
                <FormLabel>Дата проведения:</FormLabel>
                <Input
                  type="datetime-local"
                  id="date"
                  placeholder="Выберите дату и время проведения"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  {...register('date', {
                    required: 'Обязательное поле',
                    validate: (value) => {
                      const dateValue = new Date(value);
                      return dateValue < new Date()
                        ? 'Дата не может быть установлена ​​в прошлом'
                        : true;
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.date && (
                    <Box textAlign={'left'}>{errors.date.message}</Box>
                  )}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.dateEnd)}>
                <FormLabel>Дата окончания:</FormLabel>
                <Input
                  type="datetime-local"
                  id="dateEnd"
                  placeholder="Выберите дату и время проведения"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  {...register('dateEnd', {
                    required: 'Обязательное поле',
                    validate: (value, values) => {
                      const endDateValue = new Date(value);
                      const startDateValue = new Date(values.date);
                      const today = new Date();

                      return endDateValue < today ||
                        endDateValue < startDateValue
                        ? 'Дата не может быть установлена ​​в прошлом или заканчиваться раньше начала'
                        : true;
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.dateEnd && (
                    <Box textAlign={'left'}>{errors.dateEnd.message}</Box>
                  )}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.category)}>
                <FormLabel>Категория:</FormLabel>
                <Input
                  type="text"
                  id="category"
                  placeholder="Например: сортировка, утилизация"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  {...register('category', {
                    required: 'Обязательное поле',
                    maxLength: {
                      value: 65,
                      message: 'Максимальное количество символов - 65',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.category && (
                    <Box textAlign={'left'}>{errors.category.message}</Box>
                  )}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.description)}>
                <FormLabel>Описание акции:</FormLabel>
                <Textarea
                  id="description"
                  maxLength={650}
                  rows={4}
                  placeholder="Расскажите немного об акции"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  {...register('description', {
                    required: 'Обязательное поле',
                    maxLength: {
                      value: 650,
                      message: 'Максимальное количество символов - 650',
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.description && (
                    <Box textAlign={'left'}>{errors.description.message}</Box>
                  )}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.score)}>
                <FormLabel>Очки для начисления:</FormLabel>
                <NumberInput defaultValue={100} min={0}>
                  <NumberInputField
                    border={0}
                    boxShadow={0}
                    id="score"
                    placeholder="Сколько баллов начислится за участие?"
                    bg={'gray.100'}
                    color={'gray.500'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                    {...register('score', {
                      required: 'Обязательное поле',
                    })}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
                <FormErrorMessage>
                  {errors.score && (
                    <Box textAlign={'left'}>{errors.score.message}</Box>
                  )}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={Boolean(errors.img)}>
                <FormLabel htmlFor="img">Загрузить файл:</FormLabel>
                <Input
                  type="file"
                  accept="image/png, image/jpeg, image/jpg"
                  id="img"
                  placeholder="Загрузите опознавательную картинку"
                  bg={'gray.100'}
                  border={0}
                  color={'gray.500'}
                  _placeholder={{
                    color: 'gray.500',
                  }}
                  {...register('img', {
                    required: 'Обязательное поле',
                    validate: {
                      fileType: (value) => {
                        if (!value) return true;
                        const fileExtension = value[0]?.name
                          .split('.')
                          .pop()
                          .toLowerCase();
                        // console.log('fileExtension', fileExtension);
                        return (
                          fileExtension === 'png' ||
                          fileExtension === 'jpg' ||
                          fileExtension === 'jpeg' ||
                          'Неверный формат. Допустимые форматы JPG, JPEG или PNG'
                        );
                      },
                      fileSize: (value) => {
                        if (!value) return true;
                        const fileSize = value[0]?.size / (1024 * 1024); // Convert to MB
                        return (
                          fileSize <= 5 || 'Размер файла превышает лимит 5 МБ'
                        );
                      },
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.img && (
                    <Box textAlign={'left'}>{errors.img.message}</Box>
                  )}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            {serverErrorMessage && (
              <Box mt={3} textAlign={'left'} color={'red.500'}>
                {serverErrorMessage}
              </Box>
            )}
            <Button
              mt={8}
              w={'full'}
              colorScheme="customGreen"
              rounded={'full'}
              type="submit"
            >
              Создать
            </Button>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
