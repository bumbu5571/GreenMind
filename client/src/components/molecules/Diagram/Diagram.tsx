import { VictoryPie, VictoryTheme } from "victory";
import { Promotion } from "../../../types";
import { useEffect, useState } from "react";
import axiosInstance from "../../../axiosInstance";
import { Box, Heading } from "@chakra-ui/react";

export default function Diagram() {
  const data = [
    {
      x: "Сортировка",
      y: 0,
    },
    {
      x: "Утилизация",
      y: 0,
    },
    {
      x: "Волонтерство",
      y: 0,
    },
    {
      x: "Посадка деревьев",
      y: 0,
    }
  ];
  const [userPromotions, setUserPromotions] = useState<Promotion[]>([]);
  useEffect(() => {
    axiosInstance.get(`${import.meta.env.VITE_API}/promotions`).then(({data})=> setUserPromotions(data))
  },[])

  if (userPromotions.length > 0 ) {
    userPromotions.forEach((promotion) => {
      data.forEach(el => {
        if (promotion.category === el.x) el.y += 1;
      })
    })
}

  return (
    <Box>
      <Heading
        as={'h3'}
        fontSize="xl"
        fontWeight={'normal'}
        textAlign={'center'}
        mb={'1.5rem'}
      >
        Количество акций по категориям
      </Heading>
      <VictoryPie
        radius={({ datum }) => datum.y + 75}
        data={
          userPromotions.length > 0
            ? data
                .filter((el) => el.y !== 0)
                .map((el) => ({ ...el, x: `${el.x}: ${el.y}` }))
            : data.map((el) => ({ x: `${el.x}: ${el.y}`, y: 1 }))
        }
        theme={VictoryTheme.clean}
      />
    </Box>
  );
}
