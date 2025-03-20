import { Link as LinkRRD, useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useDisclosure,
  Link as LinkChakra,
  Container,
  useMediaQuery,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { userLogout } from '../../../redux/thunkActions';
import NavItems from './NavItems';
import { FaCircleUser } from 'react-icons/fa6';

function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.appSlice.user);
  const navigate = useNavigate();
  const [isLargerThan480px] = useMediaQuery('(min-width: 30em)');

  const logoutHandler = async () => {
    await dispatch(userLogout());
    if (user.isAuth) {
      navigate('/');
    }
  };

  const signupClickHandler = () => {
    navigate('/signup');
  };

  return (
    <>
      <Box bgColor={'accentLight'}>
        <Container maxW={'8xl'} as={Stack}>
          <Flex py={{ base: 2 }} fontSize={'sm'}>
            <LinkRRD to={'/'} style={{ marginRight: '15px' }}>
              <Text as={'span'}>Пользователям</Text>
            </LinkRRD>
            <LinkRRD to={'/forcompanies'}>
              <Text as={'span'}>Компаниям</Text>
            </LinkRRD>
          </Flex>
        </Container>
      </Box>
      <Box bgColor={'white'}>
        <Container
          maxW={'8xl'}
          as={Stack}
          fontSize={{ base: '14px', lg: '16px' }}
        >
          <Flex
            minH={'60px'}
            py={{ base: 2 }}
            borderBottom={1}
            borderStyle={'solid'}
            align={'center'}
          >
            {/* hamburger/close */}
            <Flex
              flex={{ base: 1, md: 'auto' }}
              ml={{ base: -2 }}
              display={{ base: 'flex', md: 'none' }}
            >
              <IconButton
                onClick={onToggle}
                icon={
                  isOpen ? (
                    <CloseIcon w={3} h={3} />
                  ) : (
                    <HamburgerIcon w={5} h={5} />
                  )
                }
                variant={'ghost'}
                aria-label={'Toggle Navigation'}
              />
            </Flex>

            {/* logo + menu */}
            <Flex
              flex={{ base: 1 }}
              align="center"
              justify={{ base: 'center', md: 'start' }}
            >
              <LinkChakra
                textAlign={{ base: 'center', md: 'left' }}
                fontFamily={'Kaoly'}
                color="accent"
                href="/"
                _hover={{}}
                fontSize={{ base: 'md', md: 'xl' }}
              >
                GreenMind
              </LinkChakra>

              <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                <Stack
                  direction={'row'}
                  spacing={4}
                  align={'center'}
                  textAlign={'center'}
                >
                  <NavItems />
                </Stack>
              </Flex>
            </Flex>

            {/* user + btns */}
            {user.user.id !== 0 ? (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                align={'center'}
                direction={'row'}
                spacing={6}
              >
                {user.user.isCompany ? (
                  <LinkRRD
                    to={'/dashboard-company'}
                    style={{ textAlign: 'right' }}
                  >
                    {isLargerThan480px ? (
                      <Text
                        as={'span'}
                        _hover={{ textDecoration: 'underline' }}
                      >
                        {user.user.name}
                      </Text>
                    ) : (
                      <Text as={'span'} _hover={{}} fontSize={'30px'}>
                        <FaCircleUser />
                      </Text>
                    )}
                  </LinkRRD>
                ) : (
                  <LinkRRD to={'/dashboard'} style={{ textAlign: 'right' }}>
                    <Text as={'span'} _hover={{ textDecoration: 'underline' }}>
                      {user.user.username}
                    </Text>
                  </LinkRRD>
                )}
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  onClick={logoutHandler}
                  colorScheme="customGreen"
                  rounded={'full'}
                >
                  Выйти
                </Button>
              </Stack>
            ) : (
              <Stack
                flex={{ base: 1, md: 0 }}
                justify={'flex-end'}
                align={'center'}
                direction={'row'}
                spacing={6}
              >
                <LinkRRD to={'/signin'}>
                  <Text as={'span'} _hover={{ textDecoration: 'underline' }}>
                    Войти
                  </Text>
                </LinkRRD>
                <Button
                  display={{ base: 'none', md: 'inline-flex' }}
                  onClick={signupClickHandler}
                  rounded={'full'}
                  colorScheme="customGreen"
                >
                  Регистрация
                </Button>
              </Stack>
            )}
          </Flex>

          <Collapse in={isOpen} animateOpacity>
            <Stack p={4} display={{ md: 'none' }}>
              <Flex direction="column" align="center" justify="center">
                <NavItems />
              </Flex>
            </Stack>
          </Collapse>
        </Container>
      </Box>
    </>
  );
}

export default Navbar;
