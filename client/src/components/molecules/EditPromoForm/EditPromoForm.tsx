import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Textarea,
  Box,
  FormErrorMessage,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Promotion } from '../../../types';

export default function EditPromoForm({
  data,
  onSubmit,
}: {
  data?: Promotion;
  onSubmit: () => void;
}) {
  function formatDateForDatetimeLocal(date: string) {
    const localDate = new Date(date);

    // Корректировка разницы часовых поясов
    localDate.setMinutes(
      localDate.getMinutes() // - localDate.getTimezoneOffset()
    );

    // Форматирование
    const year = localDate.getFullYear();
    const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
    const day = localDate.getDate().toString().padStart(2, '0');
    const hours = localDate.getHours().toString().padStart(2, '0');
    const minutes = localDate.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    values: {
      ...data,
      // date: data?.date ? (data.date.substring(0, data.date.length - 1)) : null,
      date: data?.date ? formatDateForDatetimeLocal(data.date) : null,
      // dateEnd: data?.dateEnd
      //   ? data.dateEnd.substring(0, data.dateEnd.length - 1)
      //   : null,
      dateEnd: data?.dateEnd ? formatDateForDatetimeLocal(data.dateEnd) : null,
    },
  });

  return (
    <>
      <Stack spacing={4} w={'full'} maxW={'md'} maxWidth={800}>
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
                  // validate: (value) => {
                  //   const dateValue = new Date(value);
                  //   return dateValue < new Date()
                  //     ? 'Дата не может быть установлена ​​в прошлом'
                  //     : true;
                  // },
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
                placeholder="Выберите дату и время окончания акции"
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

                    return endDateValue < today || endDateValue < startDateValue
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
            {/* <FormControl isInvalid={Boolean(errors.img)}>
              <FormLabel htmlFor="img">Загрузить файл</FormLabel>
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
            </FormControl> */}
          </Stack>
          {/* {serverErrorMessage && (
            <Box mt={3} textAlign={'left'} color={'red.500'}>
              {serverErrorMessage}
            </Box>
          )} */}
          <Button
            mt={8}
            w={'full'}
            colorScheme="customGreen"
            rounded={'full'}
            type="submit"
          >
            Сохранить
          </Button>
        </Box>
      </Stack>
    </>
  );
}
