import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

const facilities = [
  {
    imageSrc: '/images/platform.svg',
    imageAlt: 'Сервис',
    title:
      'Платформу для организации и проведения экологических акций и мероприятий',
  },
  {
    imageSrc: '/images/new-users.svg',
    imageAlt: 'Пользователи',
    title:
      'Возможность привлечь новых клиентов, заинтересованных в экологичном образе жизни',
  },
  {
    imageSrc: '/images/reputation.svg',
    imageAlt: 'Награда',
    title: 'Повышение репутации вашей компании как ответственного бизнеса',
  },
  {
    imageSrc: '/images/tool.svg',
    imageAlt: 'Инструменты',
    title: 'Инструменты для измерения влияния ваших экологических инициатив',
  },
];

function CompanyFacilities() {
  return (
    <Box bgColor={'white'} id="facilities">
      <Container
        maxW={'8xl'}
        as={Stack}
        position={'relative'}
        overflow={'hidden'}
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
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            fontWeight={'normal'}
          >
            Наш сервис предлагает вам:
          </Heading>
          <Flex
            justify={'space-between'}
            textAlign={'center'}
            direction={{ base: 'column', md: 'row' }}
            wrap={'wrap'}
          >
            {facilities.map((facility, index) => (
              <Box
                w={{ base: '100%', md: '21%' }}
                mb={{ base: '3em', md: '0' }}
                key={index}
              >
                <Flex direction={'column'} justify={'center'} align={'center'}>
                  <Flex
                    borderRadius="full"
                    boxShadow={'0 0 10px 1px rgba(139, 210, 160, 0.4)'}
                    justify={'center'}
                    align={'center'}
                    p={'15px'}
                    mb={4}
                    backgroundColor={'white'}
                  >
                    <Image
                      src={facility.imageSrc}
                      alt={facility.imageAlt}
                      height={{ base: '4rem' }}
                      w={'80%'}
                    />
                  </Flex>
                  <Text maxW={'md'}>{facility.title}</Text>
                </Flex>
              </Box>
            ))}
          </Flex>
        </Stack>
        <Image
          src="/images/windmills.svg"
          position="absolute"
          bottom={'-1%'}
          right={'0%'}
          w={{ base: '60%', md: '20%' }}
          minW={'120px'}
          opacity={'0.5'}
        />
      </Container>
    </Box>
  );
}

export default CompanyFacilities;
