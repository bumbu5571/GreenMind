import Actual from '../../molecules/ActualPromotions/Actual';
import Archive from '../../molecules/ArchivePromotions/Archive';
import TopFive from '../../molecules/TopFive/TopFive';
import Diagram from '../../molecules/Diagram/Diagram';
import { Box, Grid, GridItem, Heading, Stack, Text } from '@chakra-ui/react';
import { Flex } from '@chakra-ui/react';
import { useAppSelector } from '../../../redux/hooks';

export default function MyCabinet() {
  const user = useAppSelector((store) => store.appSlice.user.user);

  return (
    <Stack spacing={'30px'}>
      <Heading as="h2" fontSize="xl" textAlign={'center'}>
        Mои акции
      </Heading>
      <Text textAlign={'center'} fontSize={'xl'}>
        Мои баллы:{' '}
        <Text as="span" fontWeight={'600'}>
          {user.score}
        </Text>{' '}
        🌱
      </Text>
      <Grid
        gap={4}
        gridTemplateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        gridTemplateRows={'repeat(1, 1fr)'}
      >
        <GridItem colSpan={1} rowSpan={1}>
          <Actual />
          <Archive />
        </GridItem>
        <GridItem colSpan={1} rowSpan={1}>
          <GridItem colSpan={1} rowSpan={1}>
            <Flex
              direction={{ base: 'column', lg: 'column' }}
              justifyContent={{ base: 'center', lg: 'space-between' }}
              alignItems={'center'}
            >
              <TopFive />
              <Box mt={6}>
                <Diagram />
              </Box>
            </Flex>
          </GridItem>
        </GridItem>
      </Grid>
    </Stack>
  );
}
