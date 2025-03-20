import {
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import ListPromotionsDashBoard_CC from './ListPromotionsDashBoard_CC';
import ListCompanyDashBorad_CC from './ListCompanyDashBoard_CC';
import { Company, Promotion } from '../../types';

import axiosInstance from '../../axiosInstance';
import DiagramCompanyDashBoard_CC from './DiagramCompanyDashBoard_CC';
import DiagramCategoryAndUser_CC from './DiagramCategoryAndUser_CC';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { useEffect, useState } from 'react';

function CompanyCabinet() {
  const user = useAppSelector((store) => store.appSlice.user);
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
          Users: [''],
          dateEnd: '',
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
        setCompanies(
          data
        );
        const matchingCompany = data.find(
                (company) => company.id === user.user.id
              );
        setActiveCompany(matchingCompany || data[0]);
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
              Users: [''],
              dateEnd: '',
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
          {user.user.name}
        </Heading>
        <Grid gap={4}>
          <GridItem colSpan={1} rowSpan={1}>
            <ListCompanyDashBorad_CC
              companies={companies}
              clickHandler={clickHandler}
            />
          </GridItem>
          <GridItem colSpan={1} rowSpan={1}>
            <ListPromotionsDashBoard_CC
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
              <DiagramCompanyDashBoard_CC companies={companies} />
              <DiagramCategoryAndUser_CC
                promotionsCompany={activeCompany.Promotions}
              />
            </Flex>
          </GridItem>
        </Grid>
      </Stack>
    </>
  );
}

export default CompanyCabinet;
