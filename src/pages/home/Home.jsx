import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { db } from "../../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";



const Home = ({ col }) => {

  const [earnings, setEarnings] = useState();
  const [sales, setSales] = useState();
  const [total, setTotal] = useState();
  console.log(total, 'Home-sales')
  //Get earnings data for dashboard chart
  useEffect(() => {
    const fetchData = async() => {
    const unsub = onSnapshot(
      collection(
        db, "earnings"),
      (snapShot) => {
        let list = [];
        let sales = [];
        let myTotal = 0;
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        snapShot.docs.forEach((doc) => {
        sales.push( parseInt(doc.data()['Total']));
        myTotal = myTotal + parseInt(doc.data()["Total"]);
        });
        setEarnings(list);
       setSales(sales)
       setTotal(myTotal)
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }
  fetchData()
  }, []);

  return (
    <>
    <div className="home">
      
      <Sidebar />
      <div className="homeContainer">
      
        <div className="widgets">
          <Widget type="user" />
          <Widget type="product" />
          <Widget type="order" />
          <Widget type="earning" total={total}/>
        </div>
        <div className="charts">
          <Featured total={total} target="50000" title="Total Years's Earnings" />
          <Chart
            charttitle="Monthly Sales"
            aspect={2.5 / 1}
            data={earnings}
            datakeyX="month"
            datakeyY="Total"
            datakeyBar="Total"
            className="revenue"
          />
        </div>
   
        {/* <Usertable col="orders" /> */}
        {/* <Table /> */}
      </div>
    </div>
    </>
  );
};

export default Home;
