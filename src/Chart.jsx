import React from "react";
import { render } from "react-dom";
// Import Highcharts
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

export default function Chart({ data }) {
  const options = {
    chart: {
      type: "pie",
    },
    credits: {
      enabled: false,
    },
    title: {
      text: "",
      enabled: false,
    },
    legend: {
      enabled: false,
    },
    plotOptions: {
      pie: {
        showInLegend: true,
        innerSize: "20%",
        allowPointSelect: true,
        cursor: "pointer",
      },
    },

    series: [
      {
        name: "Count",
        colorByPoint: true,
        data: Object.entries(
          data.reduce((acc, k) => {
            acc[k.status] = acc[k.status] + 1 || 1;
            return acc;
          }, {})
        ).map(([k, v]) => ({ name: k, y: v })),
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}
