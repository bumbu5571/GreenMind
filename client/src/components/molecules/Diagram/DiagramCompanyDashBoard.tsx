import { VictoryLabel, VictoryPie, VictoryTheme } from 'victory';
import { Company } from '../../../types';

type TypeDiagramCompanyDashBoard = {
  companies: Company[];
};

function DiagramCompanyDashBoard({ companies }: TypeDiagramCompanyDashBoard) {
  const dataCompanies = companies
    .slice(0, 5)
    .sort((a, b) => a.Promotions.length - b.Promotions.length)
    .map((company) => {
      return {
        x: `${company.name}: ${company.Promotions.length}`,
        y: `${company.Promotions.length}`,
      };
    });

  return (
    <svg viewBox="0 0 430 420">
      <VictoryPie
        standalone={false}
        padAngle={5}
        width={400}
        height={400}
        data={dataCompanies}
        innerRadius={90}
        labelRadius={160}
        theme={VictoryTheme.clean}
        style={{
          labels: {
            fontSize: 16,
          },
        }}
      />
      <VictoryLabel
        textAnchor="middle"
        style={{ fontSize: 20 }}
        x={200}
        y={200}
        text="Количество акций"
      />
    </svg>
  );
}

export default DiagramCompanyDashBoard;
