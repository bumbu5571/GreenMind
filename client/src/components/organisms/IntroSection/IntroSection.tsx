import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react';

const advantages = [
  {
    imageSrc: '/images/group-3.svg',
    imageAlt: 'Активное участие',
    title: 'Активное участие и полезное времяпрепровождение',
    description:
      'Участие в экологических акциях — это не только вклад в природу, но и возможность активно провести время, завести новые знакомства и ощутить свою причастность к важному делу.',
  },
  {
    imageSrc: '/images/group-6.svg',
    imageAlt: 'Бонусы и скидки',
    title: 'Получение бонусов и скидок',
    description:
      'Каждый шаг на пути к улучшению окружающей среды вознаграждается! Участвуя в акциях, вы получаете очки, которые можно обменять на скидки и бонусы от компаний-партнёров.',
  },
  {
    imageSrc: '/images/group-5.svg',
    imageAlt: 'Ответственность компаний',
    title: 'Ответственность и имидж компаний',
    description:
      'Участвуя в экологических акциях, компании показывают свою ответственность за будущее планеты и укрепляют имидж "зеленого" бренда. Это помогает привлекать новых клиентов, которые ценят заботу о природе.',
  },
  {
    imageSrc: '/images/group-4.svg',
    imageAlt: 'Социальное взаимодействие',
    title: 'Социальное взаимодействие и развитие сообщества',
    description:
      'GreeenMind — это не только об экологии, но и о людях, которые хотят изменить мир к лучшему. Наши акции — это отличная возможность стать частью активного и доброжелательного сообщества.',
  },
];

export default function IntroSection() {
  return (
    <>
      <Box bgColor={'white'} lineHeight={1.5}>
        <Container
          maxW={'8xl'}
          as={Stack}
          position={'relative'}
          spacing={{ base: '8em', md: '10em' }}
          pb={{ base: '8em', md: '10em' }}
          lineHeight={'inherit'}
        >
          <Image
            src="/images/lamp.svg"
            alt="Лампочка"
            position="absolute"
            top={{ base: '-5%', md: '-10%' }}
            left={'10%'}
            w={{ base: '100%' }}
            maxW={{ base: '80px', sm: '120px' }}
          />

          <Box textAlign={'center'}>
            {/* <div className={styles.resIconContainer}>
              <img
                src="/images/recicle-sign.svg"
                alt="Переработка"
                className={styles.resIcon}
              />
            </div> */}

            <Heading
              as={'h2'}
              fontWeight={'normal'}
              mb={{ base: '2em' }}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            >
              О нас
            </Heading>
            <Text maxW={'900px'} margin={'0 auto'} fontSize={'1.2rem'}>
              <Text as={'span'} fontFamily={'Kaoly'} color="accent">
                GreeenMind
              </Text>{' '}
              — это платформа, объединяющая компании и людей для совместного
              решения экологических проблем. Мы помогаем участникам заботиться о
              природе, уменьшая экологический след, и превращаем экологические
              инициативы в увлекательное и полезное занятие.
            </Text>
          </Box>

          <Box textAlign={'center'} position={'relative'}>
            <Image
              src="/images/butterfly.svg"
              alt="Бабочка"
              position="absolute"
              top={{ base: '5%', md: '-20%' }}
              right={'5%'}
              transform={'rotate(-45deg)'}
              w={{ base: '100%' }}
              maxW={{ base: '80px', md: '120px' }}
              display={{ base: 'none', sm: 'block' }}
            />

            <Heading
              as={'h2'}
              fontWeight={'normal'}
              mb={{ base: '2em' }}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            >
              Почему Greenmind?
            </Heading>

            <Flex justify={'space-between'} gap={10} wrap={'wrap'}>
              {advantages.map((advantage, index) => (
                <Box
                  w={{ base: '100%', md: '45%', xl: '21%' }}
                  mb={{ base: '3em', md: '0' }}
                  key={index}
                >
                  <Flex
                    direction={'column'}
                    justify={'center'}
                    align={'center'}
                  >
                    <Flex
                      borderRadius="full"
                      boxShadow={'0 0 10px 1px rgba(139, 210, 160, 0.4)'}
                      justify={'center'}
                      align={'center'}
                      mb={4}
                      backgroundColor={'white'}
                    >
                      <Image
                        src={advantage.imageSrc}
                        alt={advantage.imageAlt}
                        height={{ base: '6rem' }}
                      />
                    </Flex>

                    <Box minH={{ base: '2em', md: '4em' }}>
                      <Text maxW={'xl'} fontWeight={'bold'} mb={4}>
                        {advantage.title}
                      </Text>
                    </Box>

                    <Text maxW={'md'}>{advantage.description}</Text>
                  </Flex>
                </Box>
              ))}
            </Flex>
          </Box>

          <Box textAlign={'center'}>
            <Heading
              as={'h2'}
              fontWeight={'normal'}
              mb={{ base: '2em' }}
              fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            >
              Наши достижения
            </Heading>
            <Text maxW={'900px'} margin={'0 auto'} fontSize={'1.2rem'}>
              С момента запуска платформы было организовано более 120 акций, в
              которых приняли участие свыше 5000 человек. Вместе мы уже сделали
              большой шаг к экологически чистому будущему!
            </Text>
          </Box>
        </Container>
      </Box>
    </>
  );
}
