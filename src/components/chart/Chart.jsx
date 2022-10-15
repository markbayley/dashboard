import "./chart.scss";
import {
  BarChart,
  Area,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import { collection, onSnapshot, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";

// const data = [
//   { month: "January", Total: 1200 },
//   { month: "February", Total: 2100 },
//   { month: "March", Total: 800 },
//   { month: "April", Total: 1600 },
//   { month: "May", Total: 900 },
//   { month: "June", Total: 1700 },
// ];


const Chart = ({ aspect, charttitle, col, displayName, title, product }) => {

  const [ earnings, setEarnings ] = useState()

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, col === "profile" ? "earnings" : col === "stats" ? "stats" : "orders" ),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          // doc.data().timestamp_field.toDate().getMonth()
          list.push({ id: doc.id, ...doc.data() });
        });
        const filteredList = list.filter((items) => {
 
          if (col === "users" && items.customer !== displayName) {
            return false;
          }
          if (col === "products" && items.product !== title) {
            console.log(items.product,  title, "2nd")
            return false;
          }
          if (col === "orders" && items.product !== product) {
            return false;
          }
          // if (col === "profile" && items.customer !== displayName) {
          //   return false;
          // }

          return true;
        });
       
        setEarnings(
          filteredList
        );
      },
      (error) => {
        console.log(error);
      }
    );
  
    return () => {
      unsub();
    };
  }, [displayName, title, product]);

  return (
    <div className="chart">
      <div className="title">{charttitle ? charttitle : title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          // width={730}
          // height={250}
          data={earnings}
          margin={{ top: 0, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.6} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={1} />
            </linearGradient>
          </defs>
          <XAxis dataKey={col === "profile" ? "month" : col === "stats" ? "category" : "date"} stroke="gray" />
          <YAxis dataKey={col === "profile" ? "Total" : col === "stats" ? "earnings" : "amount"} stroke="gray" />
          {/* <CartesianGrid strokeDasharray="3 3" className="chartGrid" /> */}
          <Tooltip />
          <Bar
            type="monotone"
            dataKey={col === "profile" ? "Total" : col === "stats" ? "earnings" : "amount"} 
          
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
