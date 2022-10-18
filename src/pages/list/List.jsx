import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Usertable from "../../components/datatable/Usertable";

const List = ({ col }) => {
  
  return (
    <>

    <div className="list">
      <Sidebar />
      <div className="listContainer">

        <Usertable col={col} />
      </div>
    </div>
    </>
  );
};

export default List;
