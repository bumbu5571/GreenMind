import { Box, Container, Stack, Text } from '@chakra-ui/react';
import CompanyHero from '../../organisms/CompanyHero/CompanyHero';
import CompanyFacilities from '../../organisms/CompanyFacilities/CompanyFacilities';
import ListPromotions from '../../organisms/ListPromotions/ListPromotions';
import CompanySteps from '../../organisms/CompanySteps/CompanySteps';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function CompanyHomePage() {
  const location = useLocation();

  useEffect(() => {
    let timerId: number;
    const hash = location.hash;
    if (hash) {
      timerId = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView(true);
        }
      }, 50); // @TODO: тут костыль через таймаут, хорошо бы поправить
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [location.hash]);

  return (
    <>
      <CompanyHero />
      <CompanyFacilities />
      <ListPromotions />
      <CompanySteps />
      <Box
        backgroundImage="url('/images/bg-forcompanies.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundColor={'dark'}
      >
        <Container
          maxW={'8xl'}
          as={Stack}
          textAlign={'center'}
          position={'relative'}
          color={'white'}
        >
          <Stack spacing={{ base: '4em' }} my={{ base: '5em', md: '8em' }}>
            <Text fontSize={{ base: '2xl', md: '4xl' }}>
              Сделайте свою компанию частью положительного изменения в
              окружающей среде. Присоединитесь к нам и вместе создадим более
              экологичный мир!
            </Text>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

export default CompanyHomePage;
