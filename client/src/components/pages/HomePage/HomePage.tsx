import { useEffect } from 'react';
import IntroSection from '../../organisms/IntroSection/IntroSection';
import ListPromotions from '../../organisms/ListPromotions/ListPromotions';
import Paralax from '../../organisms/ParalaxBlock/Paralax';
import { useAppSelector } from '../../../redux/hooks';
import { Flex } from '@chakra-ui/react';
import MagicButton from '../../../components/molecules/MagicButton/MagicButton';
import { Box, Container, Stack, Text } from '@chakra-ui/react';

export default function HomePage() {
  useEffect(() => {}, []);
  const user = useAppSelector((store) => store.appSlice.user);

  return (
    <Box>
      <Paralax />
      <Box id="about">
        <IntroSection />
      </Box>
      <Box id="upcoming-promotions">
        <ListPromotions />
      </Box>
      {!user.isAuth && (
        <Box
          bgColor={'dark'}
          backgroundImage="url('/images/2207222.jpg')"
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundColor={'dark'}
        >
          <Container maxW={'8xl'} as={Stack}>
            <Flex
              justify="space-between"
              align="center"
              direction={{ base: 'column', lg: 'row' }}
              width="100%"
              py={{ base: 20, md: '7rem' }}
              as={Stack}
              spacing={6}
            >
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                mr={{ base: 0, lg: 5 }}
              >
                <Text fontSize="xl" color="white" textAlign="center">
                  Сделайте шаг навстречу более экологичному будущему!
                  Присоединяйтесь к нам, участвуйте в акциях по очистке природы,
                  высадке деревьев и переработке отходов. Каждый ваш вклад — это
                  шаг к сохранению нашей планеты. Вместе мы сможем создать
                  чистый, зеленый и гармоничный мир для нас и будущих поколений!
                </Text>
              </Box>
              <Box
                minW={{ base: 'auto', md: '300px' }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <MagicButton text="Внеси свой вклад" />
              </Box>
            </Flex>
          </Container>
        </Box>
      )}
    </Box>
  );
}
