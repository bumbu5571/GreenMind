import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Company } from '../../../types';
import { useNavigate } from 'react-router-dom';

type TypeCardPromotions = {
  name: string;
  id: number;
  description: string;
  category: string;
  img: string;
  score: number;
  date: string;
  Company: Company;
  dateEnd: string;
};

function CardPromotions({
  name,
  id,
  description,
  img,
  score,
  date,
  Company,
  dateEnd,
}: TypeCardPromotions) {
  const navigate = useNavigate();

  return (
    <Card
      borderRadius="20px"
      w={{ base: '100%', lg: '30%' }}
      minH={{ base: 'auto' }}
      // mb={{ base: '2em', lg: '0' }}
      className="TEST"
    >
      <CardBody p="0">
        <Image
          src={img}
          alt="..."
          borderRadius="20px"
          objectFit="cover"
          w="100%"
          h={{ base: '252.78px', md: '247px', xl: '260px' }}
        />
        <Stack spacing="1" px={5} fontSize={'sm'}>
          <Heading
            fontSize={{ base: 'sm', md: 'md', xl: 'md' }}
            textAlign="center"
            my={5}
          >
            {name}
          </Heading>
          <Text>
            <Text as={'span'} fontWeight="semibold" pr={3}>
              Компания:
            </Text>{' '}
            {Company.name}
          </Text>
          <Text>
            <Text as={'span'} fontWeight="semibold" pr={3}>
              Начало:
            </Text>{' '}
            {new Date(date).toLocaleDateString()}{' '}
            {new Date(date).toLocaleTimeString().substring(0, 5)}
          </Text>
          <Text>
            <Text as={'span'} fontWeight="semibold" pr={3}>
              Завершение:
            </Text>{' '}
            {new Date(dateEnd).toLocaleDateString()}{' '}
            {new Date(dateEnd).toLocaleTimeString().substring(0, 5)}
          </Text>
          <Text>
            <Text as={'span'} fontWeight="semibold" pr={3}>
              Баллы:
            </Text>{' '}
            {score}
          </Text>
          <Text fontSize={'sm'}>{description.split(/[.!]/)[0] + '!'}</Text>
        </Stack>
      </CardBody>

      <CardFooter justify="center" p="20px 0">
        <ButtonGroup>
          <Button
            onClick={() => navigate(`/promopage/${id}`)}
            fontWeight={600}
            bg={'accent'}
            rounded={'full'}
            colorScheme="customGreen"
          >
            Подробнее
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
}

export default CardPromotions;
