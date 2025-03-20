import {
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Box,
  Image,
  Text,
  Button,
  Stack,
  Divider,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { Promotion } from "../../../types";
import axiosInstance from "../../../axiosInstance";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../redux/hooks";
import MagicButton from "../../../components/molecules/MagicButton/MagicButton";

export default function Promopage() {
  const [promotion, setPromotion] = useState<Promotion>();
  const { id } = useParams();
  const [isUserParticipating, setIsUserParticipating] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/promotions/${id}`)
      .then(({ data }) => {
        setPromotion(data);
      });
  }, [id]);

  const user = useAppSelector((store) => store.appSlice.user);


  // Все акции пользователя:
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/participants`)
      .then(({ data }) => {
        setPromotions(data);
        setIsUserParticipating(data.some((promo) => promo.id === Number(id)));
      })
      .catch((error) =>
        console.error("Упс! Ошибка при загрузке акций:", error)
      );
  }, []);

  const addHandler = async () => {
    try {
      const res = await axiosInstance.post(
        `${import.meta.env.VITE_API}/participants/${id}`
      );
      if (res.status === 200) {
        setPromotions((prev) => [...prev, res.data]);
        setIsUserParticipating(true);
      }
    } catch (error) {
      console.error("Ошибка при добавлении участия:", error);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await axiosInstance.delete(
        `${import.meta.env.VITE_API}/participants/${id}`
      );
      if (res.status === 200) {
        setPromotions((prev) => prev.filter((el) => el.id !== Number(id)));
        setIsUserParticipating(false);
      }
    } catch (error) {
      console.error("Ошибка при удалении участия:", error);
    }
  };

  return (
    <Flex
      justify="center"
      align="center"
      bg="gray.100"
      bgImage="url('/images/volunteer-teamwork.jpg')"
      bgSize="cover"
      bgPosition="center"
      p={'50px 20px'}
    >
      {!promotion ? (
        'loading..'
      ) : (
        <>
          <Card
            maxW="md"
            backgroundColor={'whiteAlpha.800'}
            as={Stack}
            spacing={5}
            p={5}
          >
            <CardHeader p={0}>
              <Flex justify="center" align="center" direction="column">
                <Heading as="h3" size="md">
                  {promotion.name}
                </Heading>
              </Flex>
              <Flex>
                <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                  <Box marginTop={2}>
                    <Text>
                      <Text as={'span'} fontWeight={'semibold'} mr={3}>
                        Вместе с
                      </Text>
                      {promotion.Company?.name}
                    </Text>
                    <Text mr={3} fontSize={'ml'}>
                      <Text as={'span'} fontWeight="semibold" pr={3}>
                        Начало:{' '}
                      </Text>
                      {new Date(promotion.date).toLocaleDateString()}{' '}
                      {new Date(promotion.date)
                        .toLocaleTimeString()
                        .substring(0, 5)}{' '}
                      <br />
                      <Text as={'span'} fontWeight="semibold" pr={3}>
                        Завершение:
                      </Text>
                      {new Date(promotion.dateEnd).toLocaleDateString()}{' '}
                      {new Date(promotion.dateEnd)
                        .toLocaleTimeString()
                        .substring(0, 5)}
                    </Text>
                    <Text>
                      <Text as={'span'} fontWeight={'semibold'} mr={3}>
                        Категория:
                      </Text>
                      {promotion.category}
                    </Text>
                    <Text>
                      <Text as={'span'} fontWeight={'semibold'} mr={3}>
                        Бонусные баллы за участие:
                      </Text>
                      {promotion.score}
                    </Text>
                  </Box>
                </Flex>
              </Flex>
            </CardHeader>
            <Divider mx="auto" width="50%" />
            <CardBody p={0}>
              <Text>{promotion.description}</Text>
            </CardBody>
            <Flex justify="center" align="center" direction="column">
              <Image
                objectFit="cover"
                src="/images/smile.jpg"
                alt="Земля"
                width="50%"
                height="auto"
                borderRadius="full"
              />
            </Flex>
            {user.user.isCompany === false && (
              <CardFooter
                textAlign="center"
                justify="center"
                flexWrap="wrap"
                sx={{
                  '& > button': {
                    minW: '136px',
                  },
                }}
              >
                {new Date(promotion.dateEnd) < new Date() ? (
                  <Flex justify="center" align="center" direction="column">
                    <Heading as="h3" size="md">
                      Эта акция уже завершилась
                    </Heading>
                  </Flex>
                ) : user.user.email !== '' && user.user.isCompany === false ? (
                  <>
                    {user && !isUserParticipating ? (
                      <Button
                        onClick={addHandler}
                        flex="1"
                        leftIcon={<AddIcon />}
                        colorScheme="customGreen"
                        rounded={'full'}
                      >
                        Участвовать
                      </Button>
                    ) : (
                      <Button
                        onClick={deleteHandler}
                        flex="1"
                        leftIcon={<CloseIcon />}
                        colorScheme="red"
                        rounded={'full'}
                      >
                        Отменить участие
                      </Button>
                    )}
                  </>
                ) : (
                  <>
                    <MagicButton text="Зарегистрируйся и прими участие!" />
                  </>
                )}
              </CardFooter>
            )}
          </Card>
        </>
      )}
    </Flex>
  );
}
