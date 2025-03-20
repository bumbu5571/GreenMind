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
import TabPanelCompany from '../TabPanelCompany/TabPanelCompany';
import MyCabinet from '../MyCabinet/MyCabinet';
import MyProfile from '../MyProfile/MyProfile';
import { DashboardProps, Promotion } from '../../../types';
import PromoForm from '../../molecules/PromoForm/PromoForm';
import CompanyPromotions from '../CompanyPromotions/CompanyPromotions';
import CompanyCabinet from '../../CompanyCabinet/CompanyCabinet';
import axiosInstance from '../../../axiosInstance';
import { useEffect, useState } from 'react';

const tabsCompany = [
  {
    id: 'tabCompanyCabinet',
    title: 'Кабинет',
  },
  {
    id: 'tabCompanyNew',
    title: 'Создать акцию',
  },
  {
    id: 'tabCompanyProfile',
    title: 'Профиль',
  },
  {
    id: 'tabCompanyActive',
    title: 'Действующие акции',
  },
  {
    id: 'tabCompanyArchival',
    title: 'Архивные акции',
  },
];

const tabsUser = [
  {
    id: 'tabUserCabinet',
    title: 'Кабинет',
  },
  {
    id: 'tabUserAll',
    title: 'Все акции',
  },
  {
    id: 'tabUserProfile',
    title: 'Профиль',
  },
];

function DashboardCompany({ target }: DashboardProps) {
  const [activePromotions, setActivePromotions] = useState<Promotion[]>([]);
  const [archivalPromotions, setArchivalPromotions] = useState<Promotion[]>([]);

  const fetchCompanyPromotions = async () => {
    try {
      const date = new Date();
      const response = await axiosInstance.get(
        `${import.meta.env.VITE_API}/promotions/company`
      );
      if (response.status === 200) {
        setActivePromotions(
          response.data.filter(
            (promotion: Promotion) => new Date(promotion.dateEnd) > date
          )
        );
        setArchivalPromotions(
          response.data.filter(
            (promotion: Promotion) => new Date(promotion.dateEnd) < date
          )
        );
      } else {
        setActivePromotions([]);
        setArchivalPromotions([]);
      }
    } catch (err) {
      console.error('Ошибка при получении акций компании', err);
      setActivePromotions([]);
      setArchivalPromotions([]);
    }
  };

  useEffect(() => {
    fetchCompanyPromotions();
  }, []);

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
            {target === 'company' &&
              tabsCompany.map((tab) => (
                <Tab
                  key={tab.id}
                  py={3}
                  _selected={{
                    bgColor: 'accentLight',
                    color: 'dark',
                  }}
                  fontSize={{ base: 'md', sm: '0.8rem', md: 'md' }}
                  px={{ base: '0.75rem', sm: '0.5rem', md: '0.75rem' }}
                >
                  {tab.title}
                </Tab>
              ))}

            {target === 'user' &&
              tabsUser.map((tab) => (
                <Tab
                  key={tab.id}
                  py={3}
                  _selected={{
                    bgColor: 'accentLight',
                    color: 'dark',
                  }}
                >
                  {tab.title}
                </Tab>
              ))}
          </TabList>

          {target === 'company' && (
            <>
              <TabPanels>
                <TabPanel>
                  <CompanyCabinet />
                </TabPanel>
                <TabPanel p={0}>
                  <PromoForm
                    setActivePromotions={setActivePromotions}
                    setArchivalPromotions={setArchivalPromotions}
                  />
                </TabPanel>
                <TabPanel p={0}>
                  <MyProfile />
                </TabPanel>
                <TabPanel>
                  <CompanyPromotions
                    type="active"
                    activePromotions={activePromotions}
                    setActivePromotions={setActivePromotions}
                    fetchCompanyPromotions={fetchCompanyPromotions}
                  />
                </TabPanel>
                <TabPanel>
                  <CompanyPromotions
                    type="archival"
                    archivalPromotions={archivalPromotions}
                    fetchCompanyPromotions={fetchCompanyPromotions}
                  />
                </TabPanel>
              </TabPanels>
            </>
          )}

          {target === 'user' && (
            <>
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
            </>
          )}
        </Tabs>
      </Container>
    </Box>
  );
}

export default DashboardCompany;
