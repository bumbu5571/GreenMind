import { Flex } from '@chakra-ui/react';
import AuthForm from '../../organisms/AuthForm/AuthForm';

export default function SignupPage() {
  return (
    <Flex
      py={{ base: 50, sm: 100 }}
      px={{ base: 4 }}
      justify={'center'}
      backgroundImage="url('/public/images/bg-form.jpg')"
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
      backgroundColor={'dark'}
    >
      <AuthForm title="Регистрация" type="signup" />
    </Flex>
  );
}
