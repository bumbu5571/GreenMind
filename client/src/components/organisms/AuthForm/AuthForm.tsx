import { useState } from 'react';
import { Box, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthFormProps, Inputs } from '../../../types';
import { userSignin, userSignup } from '../../../redux/thunkActions';
import { useAppDispatch } from '../../../redux/hooks';
import SignUpForm from './SignUpForm';
import SignInForm from './SignInForm';

export default function AuthForm({ title, type = 'signin' }: AuthFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const submitHandler = async (inputs: Inputs) => {
    let res;
    if (type === 'signup') {
      res = await dispatch(userSignup(inputs));
    }

    if (type === 'signin') {
      res = await dispatch(userSignin(inputs));
    }

    console.log('authform response', res);

    if (res?.payload !== 'undefined' && res?.payload.user) {
      if (res?.payload.user.isCompany) {
        navigate('/dashboard-company');
      } else {
        navigate('/dashboard');
      }
    }

    if (typeof res?.payload === 'string') {
      setServerErrorMessage(res.payload);
    }
  };

  return (
    <Box position={'relative'}>
      <Stack
        bg={'white'}
        rounded={'xl'}
        p={{ base: 4, sm: 6, md: 8 }}
        spacing={{ base: 8 }}
        maxW={{ lg: 'lg' }}
        textAlign={'center'}
      >
        {type === 'signup' ? (
          <SignUpForm
            onSubmit={submitHandler}
            title={title}
            error={serverErrorMessage}
          />
        ) : (
          <SignInForm
            onSubmit={submitHandler}
            title={title}
            error={serverErrorMessage}
          />
        )}
      </Stack>
    </Box>
  );
}
