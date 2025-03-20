import {
  Box,
  Container,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import MyCabinet from '../MyCabinet/MyCabinet';
import MyProfile from '../MyProfile/MyProfile';
import TabPanelCompany from '../TabPanelCompany/TabPanelCompany';

function DashBoard() {
  return (
    <Box bgColor={'white'}>
      <Container maxW={'8xl'} as={Stack}>
        <Tabs
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          variant="soft-rounded"
          isLazy
        >
          <TabList
            borderRight={{ base: 0, md: '1px' }}
            display="flex"
            flexDirection={{ base: 'column', sm: 'row', md: 'column' }}
            py={2}
            pr={{ base: 0, md: 2 }}
            maxW={{ base: 'auto', md: '180px' }}
            width={'full'}
            lineHeight={'normal'}
          >
            <Tab py={3}>Кабинет</Tab>
            <Tab py={3}>Компании и акции</Tab>
            <Tab py={3}>Профиль</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <MyCabinet />
            </TabPanel>
            <TabPanel>
              <TabPanelCompany />
            </TabPanel>
            <TabPanel p={0}>
              <MyProfile />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </Box>
  );
}

export default DashBoard;
