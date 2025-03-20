import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import ListPromotionsDashBoard from '../ListPromotionsDashBoard/ListPromotionsDashBoard';
import ListCompanyDashBorad from '../ListCompanyDashBoard/ListCompanyDashBoard';
import { Company, Promotion } from '../../../types';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import DiagramCompanyDashBoard from '../../molecules/Diagram/DiagramCompanyDashBoard';
import DiagramCategoryAndUser from '../../molecules/Diagram/DiagramCategoryAndUser';
import { useNavigate } from 'react-router-dom';

function TabPanelCompany() {
  const navigate = useNavigate();
  const [userPromotions, setUserPromotions] = useState<Promotion[]>([]);
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 0,
      name: '',
      Promotions: [
        {
          id: 0,
          name: '',
          description: '',
          category: '',
          img: '',
          score: 0,
          date: '',
          dateEnd: '',
          Users: [''],
        },
      ],
    },
  ]);
  const [activeCompany, setActiveCompany] = useState<Company>(companies[0]);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/promotions`)
      .then(({ data }) => setUserPromotions(data));

    axiosInstance
      .get(`${import.meta.env.VITE_API}/companies`)
      .then(({ data }) => {
        const nowDate = new Date();
        const activeData = data
          .map((company: Company) => ({
            ...company,
            Promotions: company.Promotions.filter(
              (promotion: Promotion) =>
                new Date(promotion.dateEnd).getTime() >= nowDate.getTime()
            ),
          }))
          .sort(
            (a: Company, b: Company) =>
              b.Promotions.length - a.Promotions.length
          );
        setCompanies(activeData);
        setActiveCompany(activeData[0]);
      });
  }, []);

  const clickHandler = (event: React.MouseEvent<HTMLTableElement>): void => {
    const td = event.target as HTMLTableElement;
    if (/company/.test(td.className)) {
      setActiveCompany(
        companies.find((el) => el.id === Number(td.id)) || {
          id: 0,
          name: '',
          Promotions: [
            {
              id: 0,
              name: '',
              description: '',
              category: '',
              img: '',
              score: 0,
              date: '',
              dateEnd: '',
              Users: [''],
            },
          ],
        }
      );
    }

    if (/promotion/.test(td.className)) {
      navigate(`/promopage/${td.id}`);
    }
  };

  return activeCompany.name === '' ? (
    <>
      <Flex w="90wh" h="89vh" justify="center" alignItems="center">
        <Spinner
          speed="0.8s"
          thickness="5px"
          w="5em"
          h="5em"
          color="brand.200"
        />
      </Flex>
    </>
  ) : (
    <>
      <Stack spacing={'30px'}>
        <Heading as="h2" fontSize="xl" textAlign={'center'}>
          {activeCompany.name}
        </Heading>
        <Grid gap={4}>
          <GridItem colSpan={1} rowSpan={1}>
            <ListCompanyDashBorad
              companies={companies}
              clickHandler={clickHandler}
            />
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <ListPromotionsDashBoard
              userPromotions={userPromotions}
              promotionsCompany={activeCompany.Promotions}
              clickHandler={clickHandler}
            />
          </GridItem>
          <GridItem
            colSpan={1}
            rowSpan={1}
            justifySelf="center"
            alignSelf="center"
            width={'full'}
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              justifyContent={{ base: 'center', md: 'space-between' }}
              alignItems={'center'}
            >
              <DiagramCompanyDashBoard companies={companies} />
              <DiagramCategoryAndUser
                promotionsCompany={activeCompany.Promotions}
              />
            </Flex>
          </GridItem>
        </Grid>
      </Stack>
    </>
  );
}

export default TabPanelCompany;
