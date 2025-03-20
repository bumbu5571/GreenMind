import {
  Box,
  Container,
  Flex,
  Heading,
  Image,
  Link as LinkChakra,
  Stack,
  Text,
} from '@chakra-ui/react';
import { Link as LinkRRD } from 'react-router-dom';
import { useAppSelector } from '../../../redux/hooks';

function CompanyHero() {
  const user = useAppSelector((store) => store.appSlice.user);

  return (
    <Box bgColor={'white'}>
      <Container maxW={'8xl'} as={Stack}>
        <Stack
          textAlign={'center'}
          align={'center'}
          spacing={{ base: '4em' }}
          my={{ base: 20 }}
        >
          <Heading
            as={'h1'}
            fontWeight={600}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
            color={'dark'}
          >
            <Text
              as={'span'}
              color={'accent'}
              fontSize={'1.2em'}
              fontFamily={'Kaoly'}
            >
              GreenMind -
            </Text>
            <br></br>
            платформа для экологических инициатив
          </Heading>
          <Text maxW={'3xl'} fontSize={'1.1em'}>
            Установите лидерство в экологической сфере и привлеките внимание к
            своей заботе о планете!
          </Text>
          <Stack spacing={6} direction={{ base: 'column', sm: 'row' }}>
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
                >
                  Разместить акцию
                </Text>
              </LinkRRD>
            )}

            <LinkChakra href="#facilities" _hover={{}}>
              <Text
                as={'span'}
                display={'block'}
                fontWeight={600}
                bg={'gray.200'}
                _hover={{
                  bg: 'gray.300',
                }}
                rounded={'full'}
                px={6}
                py={3}
              >
                Узнать подробнее
              </Text>
            </LinkChakra>
          </Stack>
          <Flex justify={'center'}>
            <Image
              src="/images/christmas-tree.png"
              alt="Tree"
              height={{ sm: '24rem', lg: '40rem' }}
            />
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
}

export default CompanyHero;
