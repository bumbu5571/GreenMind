import {
  VictoryArea,
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from 'victory';
import { Promotion } from '../../../types';

type TypeDiagramCategoryAndUser = {
  promotionsCompany: Promotion[];
};

function DiagramCategoryAndUser({
  promotionsCompany,
}: TypeDiagramCategoryAndUser) {
  const dataCategory = promotionsCompany.map((el) => {
    return {
      x: el.category,
      y: el.Users?.length,
    };
  });

  return (
    <VictoryChart
      theme={VictoryTheme.clean}
      containerComponent={<VictoryVoronoiContainer />}
      title="Количество участников"
    >
      <VictoryArea
        data={dataCategory}
        labelComponent={<VictoryTooltip />}
        labels={({ datum }) => datum.y}
        interpolation="linear"
      />
    </VictoryChart>
  );
}

export default DiagramCategoryAndUser;
