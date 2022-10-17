import "./stats.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { DataGrid } from "@mui/x-data-grid";
import { statColumns } from "../../datatablesource";
import Usertable from "../../components/datatable/Usertable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const Stats = ({ col }) => {

  const [total, setTotal] = useState();
  console.log(total, "Total");
  const [data, setData] = useState();
  console.log(data, "DatA");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "orders"),
      (snapShot) => {
        let list = [];

        let amount = 0;
        snapShot.docs.forEach((doc) => {
          list.push( [doc.data()["total"], doc.data()["date"]]);
          amount = amount + doc.data()["total"];
        });

      
  
        setTotal(amount.toFixed(2));
        setData(list)


      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);



  return (
    <div className="stats">
      <Sidebar />
      <div className="statsContainer">
 
        <div className="statsTitle">
          {col === "users"
            ? "Users"
            : col === "products"
            ? "Products"
            : col === "orders"
            ? "Orders"
            : col === "profile"
            ? "Profile"
            : col === "stats"
            ? "Stats"
            : "Delivery"}

          <Link to={"/" + col + "/new"} className="link">
            Add
          </Link>
        </div>

        <div className="charts">
          <Chart
            title="Monthly Users"
            aspect={2 / 1}
            className="revenue"
            col={col}
          />
          <Chart
            title="Monthly Products "
            aspect={2 / 1}
            className="revenue"
            col={col}
          />
          <Chart
            title="Monthly Orders"
            aspect={2 / 1}
            className="revenue"
            col={col}
          />
        </div>
        <div className="charts">
          <Featured />
          <Featured />
          <Featured total={total} />
        </div>

        <Usertable col="orders" />
      </div>
    </div>
  );
};

export default Stats;
