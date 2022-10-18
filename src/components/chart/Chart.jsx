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

          <Tooltip />
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

// data={col === "stats" ? tot : ""}
// <XAxis dataKey={tot ? "date" : ""} stroke="gray" />
// <YAxis dataKey={tot ? "amount" : ""} stroke="gray" />
// dataKey={tot ? "amount" : ""}



  // const [earnings, setEarnings] = useState();
  // console.log(col, "col-chart");
  // useEffect(() => {
  //   const unsub = onSnapshot(
  //     collection(
  //       db,
  //       col === "profile"
  //         ? "earnings"
  //         : col === "stats"
  //         ? "stats"
  //         : "transactions"
  //     ),
  //     (snapShot) => {
  //       let list = [];
  //       snapShot.docs.forEach((doc) => {
  //         // doc.data().timestamp_field.toDate().getMonth()
  //         list.push({ id: doc.id, ...doc.data() });
  //       });
  //       const filteredList = list.filter((items) => {
  //         if (col === "users" && items.customer !== displayName) {
  //           return false;
  //         }
  //         if (col === "products" && items.product !== title) {
  //           console.log(items.product, title, "2nd");
  //           return false;
  //         }
  //         if (col === "orders" && items.product !== product) {
  //           return false;
  //         }
  //         // if (col === "profile" && items.customer !== displayName) {
  //         //   return false;
  //         // }

  //         return true;
  //       });

  //       setEarnings(filteredList);
  //     },
  //     (error) => {
  //       console.log(error);
  //     }
  //   );

  //   return () => {
  //     unsub();
  //   };
  // }, [displayName, title, product]);
