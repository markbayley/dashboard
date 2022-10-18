import "./stats.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Usertable from "../../components/datatable/Usertable";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../../components/navbar/Navbar";

const Stats = ({ col }) => {

  const [totalSales, setTotalSales] = useState();
  const [lastMonthSales, setLastMonthSales] = useState()
  const [lastQuarterSales, setLastQuarterSales] = useState()

  const [month, setMonth] = useState();
  const [quarter, setQuarter] = useState();
  const [year, setYear] = useState();

  //Calculate monthly orders for stats chart
  useEffect(async() => {

    const today = new Date(); // 18 Oct 2022 ...

    const month = today.getMonth() //9

    const months = [{name: "Jan", value: 0},
                     {name:"Feb", value: 1},
                     {name:"Mar", value: 2},
                     {name:"Apr", value: 3},
                     {name:"May", value: 4},
                     {name:"Jun", value: 5},
                     {name:"Jul", value: 6},
                     {name:"Aug", value: 7},
                     {name:"Sep", value: 8},
                     {name:"Oct", value: 9},
                     {name:"Nov", value: 10},
                     {name:"Dec", value: 11}
                    ]

    console.log(today.getMonth(), 'today')
    if (today.getMonth() === 9){
      console.log("Oct")
    }
    const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));
    const Jul = new Date(new Date().setMonth(today.getMonth() - 3));
    const monthFour = new Date(new Date().setMonth(today.getMonth() - 4));

    const monthFourQuery = query(
      collection(db, "orders"),
      where("timeStamp", "<=", Jul),
      where("timeStamp", ">", monthFour)
    );

    const JulMonthQuery = query(
      collection(db, "orders"),
      where("timeStamp", "<=", prevMonth),
      where("timeStamp", ">", Jul)
    );

    const prevMonthQuery = query(
      collection(db, "orders"),
      where("timeStamp", "<=", lastMonth),
      where("timeStamp", ">", prevMonth)
    );

    const lastMonthQuery = query(
      collection(db, "orders"),
      where("timeStamp", "<=", today),
      where("timeStamp", ">", lastMonth)
    );
   
    const monthFourData = await getDocs(monthFourQuery);
    const JulMonthData = await getDocs(JulMonthQuery);
    const prevMonthData = await getDocs(prevMonthQuery);
    const lastMonthData = await getDocs(lastMonthQuery);
 
    let myamount = 0;
    lastMonthData.docs.forEach((doc) => {
     myamount = myamount + doc.data()["total"];
    });
    let myamount2 = 0;
    prevMonthData.docs.forEach((doc) => {
      myamount2 = myamount2 + doc.data()["total"];
     });
     let myamount3 = 0;
    JulMonthData.docs.forEach((doc) => {
      myamount3 = myamount3 + doc.data()["total"];
     });
     let myamount4 = 0
     monthFourData.docs.forEach((doc) => {
      // myamount4 = myamount4 + doc.data()["total"];
      myamount4 = myamount4 + doc.data()["total"];
     });
     console.log(myamount4, 'myamount4') //Nov
     setLastMonthSales(myamount3.toFixed(2))
     setLastQuarterSales((myamount3 + myamount2 + myamount).toFixed(2))
     setTotalSales((myamount4 + myamount3 + myamount2 + myamount).toFixed(2))
     setMonth([

    // { amount: parseInt(myamount2.toFixed(2)), date: "Sep", id: 2},
    {amount: parseInt(myamount.toFixed(2)), date: "Oct", id: 1} ])
    setQuarter([
      // { amount: 214, date: "May", id: 6},
      // { amount: 154, date: "Jun", id: 5},
    { amount: parseInt(myamount4.toFixed(2)), date: "Jul", id: 4},
    { amount: parseInt(myamount3.toFixed(2)), date: "Aug", id: 3},
    { amount: parseInt(myamount2.toFixed(2)), date: "Sep", id: 2},
    {amount: parseInt(myamount.toFixed(2)), date: "Oct", id: 1}]);

    setYear([
      { amount: 214, date: "Jan", id: 10},
      { amount: 154, date: "Feb", id: 9},
      { amount: 214, date: "Mar", id: 8},
      { amount: 154, date: "Apr", id: 7},
      { amount: 214, date: "May", id: 6},
      { amount: 154, date: "Jun", id: 5},
    { amount: parseInt(myamount4.toFixed(2)), date: "Jul", id: 4},
    { amount: parseInt(myamount3.toFixed(2)), date: "Aug", id: 3},
    { amount: parseInt(myamount2.toFixed(2)), date: "Sep", id: 2},
    {amount: parseInt(myamount.toFixed(2)), date: "Oct", id: 1}]);

  }, []);

  return (
    <>

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
<div>
<Link to={""} className="link">
            Customers
          </Link>
          <Link to={""} className="link">
            Purchases
          </Link>
          <Link to={""} className="link">
            Deliveries
          </Link>
  
          </div>
        </div>

        <div className="charts">
          <Chart
               charttitle="Monthly Sales"
               aspect={2 / 1}
               data={month}
               datakeyX="date"
               datakeyY="amount"
               datakeyBar="amount"
               className="revenue"
   
          />
          <Chart
              charttitle="Quarterly Sales"
              aspect={2 / 1}
              data={quarter}
              datakeyX="date"
              datakeyY="amount"
              datakeyBar="amount"
              className="revenue"
         
          />
     
          <Chart
            charttitle="Yearly Sales"
            aspect={2 / 1}
            className="revenue"
            datakeyX="date"
            datakeyY="amount"
            datakeyBar="amount"
       
         
            data={year}
          />
        </div>
        <div className="charts">
          <Featured total={lastMonthSales} title="Last Month's Sales" target="520"/>
          <Featured total={lastQuarterSales} title="Last Quarter's Sales" target="1575"/>
          <Featured total={totalSales} title="Total Years's Sales" target="19650" />
        </div>

        {/* <Usertable col="orders" /> */}
      </div>
    </div>
    </>
  );
};

export default Stats;
