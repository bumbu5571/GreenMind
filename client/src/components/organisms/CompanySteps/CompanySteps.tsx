import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link as LinkRRD } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';

const steps = [
  {
    description: 'Зарегистрируйтесь',
  },
  {
    description: 'Разместите акцию',
  },
  {
    description: 'Следите за результатом',
  },
];

function CompanySteps() {
  const user = useAppSelector((store) => store.appSlice.user);

  return (
    <Box bgColor={'white'} id="steps">
      <Container
        maxW={'8xl'}
        as={Stack}
        textAlign={'center'}
        position={'relative'}
      >
        <Stack
          spacing={{ base: '4em' }}
          my={{ base: 20 }}
          position={'relative'}
          zIndex={2}
        >
          <Heading
            as="h2"
            textAlign={'center'}
            // color={'white'}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            fontWeight={'normal'}
          >
            Как создать свою акцию?
          </Heading>
          <Flex
            justify={'space-between'}
            direction={{ base: 'column', md: 'row' }}
          >
            {steps.map((step, index) => (
              <Box
                w={{ base: '100%', md: '30%' }}
                mb={{ base: '3em', md: '0' }}
                key={index}
              >
                <Text
                  fontSize={'7xl'}
                  fontWeight={'bold'}
                  color={'white'}
                  textShadow={
                    '-1px -1px 0 #55b76b, 1px -1px 0 #55b76b, -1px 1px 0 #55b76b, 1px 1px 0 #55b76b'
                  }
                >
                  {index + 1}
                </Text>
                <Text>{step.description}</Text>
              </Box>
            ))}
          </Flex>
          <Text fontSize={'1.2em'}>
            Запустите первую экологическую акцию уже сегодня и сделайте свой
            бренд более привлекательным для современного потребителя
          </Text>
          {user.user.id !== 0 ? (
            <LinkRRD to="/dashboard-company">
              <Text
                as={'span'}
                display={'block'}
                fontWeight={600}
                color={'white'}
                bg={'accent'}
                _hover={{
                  bg: 'btnHover',
                }}
                _active={{
                  bg: 'btnActive',
                }}
                rounded={'full'}
                px={6}
                py={3}
                maxW={'300px'}
                m={'0 auto'}
              >
                Разместить акцию
              </Text>
            </LinkRRD>
          ) : (
            <LinkRRD to="/signin">
              <Text
                as={'span'}
                display={'block'}
                fontWeight={600}
                color={'white'}
                bg={'accent'}
                _hover={{
                  bg: 'btnHover',
                }}
                _active={{
                  bg: 'btnActive',
                }}
                rounded={'full'}
                px={6}
                py={3}
                maxW={'300px'}
                m={'0 auto'}
              >
                Разместить акцию
              </Text>
            </LinkRRD>
          )}
        </Stack>
        <Image
          src="/images/leaf.svg"
          position="absolute"
          bottom={{ base: '0%', md: '-5%' }}
          left={'0%'}
          w={{ base: '75%', md: '30%' }}
          minW={'120px'}
        />
      </Container>
    </Box>
  );
}

export default CompanySteps;
