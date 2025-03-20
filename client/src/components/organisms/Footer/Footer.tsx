import {
  Box,
  Container,
  Flex,
  Stack,
  Text,
  Link as LinkChakra,
} from '@chakra-ui/react';
import NavItems from '../Navbar/NavItems';

function Footer() {
  return (
    <Box bg={'dark'} color={'white'}>
      <Container
        as={Stack}
        maxW={'8xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        <Flex
          flex={{ base: 1 }}
          align="center"
          justify={{ base: 'center', md: 'start' }}
        >
          <LinkChakra
            textAlign={'center'}
            fontFamily={'Kaoly'}
            fontSize={'xl'}
            color="accent"
            href="/"
            _hover={{}}
            bg={'white'}
            borderRadius={10}
            p={'10px 45px'}
          >
            GreenMind
          </LinkChakra>
        </Flex>
        <Stack
          direction={{ base: 'column', sm: 'row' }}
          spacing={1}
          justify={'center'}
          align={'center'}
        >
          <NavItems />
        </Stack>
      </Container>

      <Box borderTopWidth={1} borderStyle={'solid'} borderColor={'gray.200'}>
        <Container
          maxW={'8xl'}
          py={4}
          display={'flex'}
          justifyContent={'center'}
        >
          <Text>© Все права защищены.</Text>
        </Container>
      </Box>
    </Box>
  );
}

export default Footer;
