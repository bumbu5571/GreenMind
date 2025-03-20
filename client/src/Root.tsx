import { Outlet } from 'react-router-dom';
import Navbar from './components/organisms/Navbar/Navbar';
import Footer from './components/organisms/Footer/Footer';
import { Box } from '@chakra-ui/react';

export default function Root() {
  return (
    <>
      <Navbar />
      <Box minH={"100vh"}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
