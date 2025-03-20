import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  Box,
  Flex,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
} from '@chakra-ui/react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Promotion } from '../../../types';
import axiosInstance from '../../../axiosInstance';
import { useNavigate } from 'react-router-dom';
import EditPromoForm from '../../molecules/EditPromoForm/EditPromoForm';

type TypeCompanyPromotions = {
  type: string;
  activePromotions?: Promotion[];
  setActivePromotions?: Dispatch<SetStateAction<Promotion[]>>;
  archivalPromotions?: Promotion[];
  fetchCompanyPromotions: any;
};

function CompanyPromotions({
  type,
  activePromotions,
  archivalPromotions,
  setActivePromotions,
  fetchCompanyPromotions,
}: TypeCompanyPromotions) {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [promotionData, setPromotionData] = useState<Promotion[]>([]);
  // const [serverErrorMessage, setServerErrorMessage] = useState('');

  useEffect(() => {
    if (type === 'active') {
      setPromotions(activePromotions || []);
    } else setPromotions(archivalPromotions || []);
  }, [activePromotions, archivalPromotions]);

  const navigate = useNavigate();
  const toast = useToast();

  const moreHandler = (id: number) => {
    navigate(`/promopage/${id}`);
  };

  const deleteHandler = async (id: number) => {
    try {
      const response = await axiosInstance.delete(
        `${import.meta.env.VITE_API}/promotions/${id}`
      );
      if (response.status === 200) {
        setPromotions(promotions.filter((promotion) => promotion.id !== id));
        setActivePromotions(promotions.filter((promotion) => promotion.id !== id));
      }
    } catch (err) {
      console.error('Error deleting promo', err);
    }
  };

  const editClickHandler = async (id: number) => {
    onOpen();
    try {
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API}/promotions/${id}`
      );
      if (response.status === 200) {
        const promo = response.data;
        setPromotionData(promo);
      }
    } catch (err) {
      console.error('Error getting promo data', err);
    }
  };

  const updateHandler = async (newData) => {
    try {
      const response = await axiosInstance.put(
        `${import.meta.env.VITE_API}/promotions/${newData.id}`,
        newData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        }
      );
      onClose();
      if (response.status === 200) {
        setPromotions(
          promotions.map((promotion) => {
            if (promotion.id === newData.id) {
              return newData;
            } else return promotion;
          })
        );
        await fetchCompanyPromotions();
        // setServerErrorMessage('');

        toast({
          title: 'Событие успешно отредактировано!',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });
      }
    } catch (err) {
      console.error('company promotions err', err);
      // setServerErrorMessage(
      //   err.response?.data?.text || 'Ошибка при обновлении чая'
      // );
    }
  };

  return (
    <>
      <Stack spacing={'50px'} py={5}>
        <Heading as="h3" fontSize={'xl'} textAlign={'center'}>
          {type === 'archival' ? 'Прошедшие акции' : 'Действующие акции'}
        </Heading>

        <Box as={Stack} spacing={8}>
          {promotions.map((promotion) => (
            <Card
              key={promotion.id}
              direction={{ base: 'column', md: 'row' }}
              overflow="hidden"
              variant="outline"
              width={'full'}
              boxShadow={'lg'}
            >
              <Image
                objectFit="cover"
                w={'full'}
                maxW={{ base: '100%', md: '200px' }}
                src={`${import.meta.env.VITE_BASE_URL}/${promotion.img}`}
                alt={promotion.name}
              />

              <Box>
                <CardBody as={Stack} spacing={3}>
                  <Heading as={'h4'} fontSize={'1.2em'}>
                    {promotion.name}
                  </Heading>
                  <Text fontSize={'sm'}>
                    <Text as={'span'} fontWeight="semibold" pr={3}>
                      Период проведения:
                    </Text>
                  </Text>
                  <Text fontSize={'sm'}>
                    <Text as={'span'} pr={3}>
                      с {new Date(promotion.date).toLocaleDateString()}{' '}
                      {new Date(promotion.date)
                        .toLocaleTimeString()
                        .substring(0, 5)}{' '}
                      по {new Date(promotion.dateEnd).toLocaleDateString()}{' '}
                      {new Date(promotion.dateEnd)
                        .toLocaleTimeString()
                        .substring(0, 5)}
                    </Text>
                  </Text>
                </CardBody>

                <CardFooter>
                  <Flex
                    justify={{ base: 'center', lg: 'flex-start' }}
                    direction={{ base: 'column', lg: 'row' }}
                    width={'full'}
                  >
                    <Button
                      colorScheme="customGreen"
                      rounded={'full'}
                      onClick={() => moreHandler(promotion.id)}
                      mr={{ base: 0, lg: 2 }}
                      mb={{ base: 2, lg: 0 }}
                    >
                      Подробнее
                    </Button>

                    {type === 'archival' ? (
                      <Button
                        variant="outline"
                        colorScheme="customGreen"
                        rounded={'full'}
                        onClick={() =>
                          navigate(`/participants/promo/${promotion.id}`)
                        }
                      >
                        Заявки
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          colorScheme="customGreen"
                          rounded={'full'}
                          mr={{ base: 0, lg: 2 }}
                          mb={{ base: 2, lg: 0 }}
                          onClick={() => editClickHandler(promotion.id)}
                        >
                          Редактировать
                        </Button>
                        <Button
                          variant="outline"
                          colorScheme="customGreen"
                          rounded={'full'}
                          mr={{ base: 0, lg: 2 }}
                          mb={{ base: 2, lg: 0 }}
                          onClick={() => deleteHandler(promotion.id)}
                        >
                          Удалить
                        </Button>
                      </>
                    )}
                  </Flex>
                </CardFooter>
              </Box>
            </Card>
          ))}
        </Box>
      </Stack>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent py={'40px'}>
          <ModalHeader position={'static'}>Редактирование</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <EditPromoForm data={promotionData} onSubmit={updateHandler} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default CompanyPromotions;
