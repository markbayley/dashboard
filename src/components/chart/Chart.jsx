import "./chart.scss";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";

const Chart = ({
  charttitle,
  aspect,
  data,
  datakeyX,
  datakeyY,
  datakeyBar
}) => {

  return (
    <div className="chart">
      <div className="title">{charttitle}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          data={data}
          margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis dataKey={datakeyX} stroke="gray" />
          <YAxis dataKey={datakeyY} stroke="gray" />

          <Tooltip cursor={{fill: 'transparent'}}/>
          <Bar
            type="monotone"
            dataKey={datakeyBar}
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;


