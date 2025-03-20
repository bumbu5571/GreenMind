import { Flex, Heading, Image, Spinner, Stack } from '@chakra-ui/react';
import CardPromotions from '../../molecules/CardPromotions/CardPromotions';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../axiosInstance';
import { Promotion } from '../../../types';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './styles.css';

import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';

function ListPromotions() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/promotions/all`)
      .then(({ data }) => {
        const nowDate = new Date();
        setPromotions(
          data.filter(
            (promotion: Promotion) =>
              new Date(promotion.dateEnd).getTime() >= nowDate.getTime()
          )
        );
      });
  }, []);
console.log(promotions)
  return promotions.length <= 0 ? (
    <Flex w="90wh" h="89vh" justify="center" alignItems="center" bg="brand.100">
      <Spinner speed="0.8s" thickness="5px" w="5em" h="5em" color="brand.200" />
    </Flex>
  ) : (
    <>
      <Flex
        direction="column"
        bg="brand.100"
        as={Stack}
        spacing={6}
        py={{ base: '5rem', md: '5rem' }}
        position={'relative'}
      >
        <Heading
          as="h2"
          textAlign={'center'}
          color={'white'}
          fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
          fontWeight={'normal'}
          // mb={''}
        >
          Ближайшие акции
        </Heading>
        <Image
          src="/images/vector.svg"
          position="absolute"
          top={{ base: '2%' }}
          left={{ base: '1%' }}
          w={{ base: '15%', md: '8%' }}
        />
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          initialSlide={Math.floor(promotions.length / 2)}
          spaceBetween={75}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 0,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="mySwiper"
          loop={true}
        >
          {promotions.map((promotion) => (
            <SwiperSlide key={promotion.id}>
              <CardPromotions
                id={promotion.id}
                name={promotion.name}
                description={promotion.description}
                category={promotion.category}
                img={`${import.meta.env.VITE_BASE_URL}/${promotion.img}`}
                score={promotion.score}
                date={promotion.date}
                Company={promotion.Company}
                dateEnd={promotion.dateEnd}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Flex>
    </>
  );
}

export default ListPromotions;
