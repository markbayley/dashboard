import "./home.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";





const Home = ({col}) => {
console.log(col, "col-HOME")
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" />
          <Widget type="product" />
          <Widget type="order" />
          <Widget type="earning" />
        </div>
        <div className="charts">
          <Featured />
          {/* <Chart title="Earnings" aspect={4 / 1} className="revenue"/> */}
          <Chart title="Monthly Sales" aspect={2.5 / 1} className="revenue" col={col}/>
       
        </div>
        {/* <Usertable col="stats" /> */}
        {/* <div className="listContainer">
        <div className="listTitle">Latest Transactions</div>
     
        
        </div> */}
    
             {/* <Table /> */}
           
      </div>
    </div>
  );
};

export default Home;
