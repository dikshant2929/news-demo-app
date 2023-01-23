import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import faker from 'faker';
import voteCountMap from '../pages/news/services/vote-count-service';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Vote Up Chart',
    },
  },
};

const labels = Object.keys(voteCountMap); // ['January', 'February', 'March', 'April', 'May', 'June', 'July'];



export function LineChart(props) {

    const data = {
        labels : props.label,
        datasets: [
          {
            label: 'Votes',
            data: Object.keys(voteCountMap).map(objectId => voteCountMap[objectId]), //labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
        ],
      };

  return <Line options={options} data={data} />;
}
