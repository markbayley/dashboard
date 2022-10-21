import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Usertable from "../../components/datatable/Usertable";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const List = ({ col }) => {
  const [data, setData] = useState([]);
  console.log(data, "Usertable-data");
  const [updatedData, setupdatedData] = useState(data);
  console.log(updatedData, "updateddata");

  //Get row data for users/products/columns for table component
  useEffect(() => {
        const fetchData = async () => {
      let list = [];
      try {
        const querySnapshot = await getDocs(collection(db, col));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setupdatedData(list);
        setData(list);
        console.log(list);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    // const unsub = onSnapshot(
    //   collection(db, col),
    //   (snapShot) => {
    //     let list = [];
    //     snapShot.docs.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setupdatedData(list);
    //     setData(list);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
    // return () => {
    //   unsub();
    // };
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, col, id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="list">
        <Sidebar />
        <div className="listContainer">
          <Usertable
            col={col}
            handleDelete={handleDelete}
            data={data}
            setData={setData}
            updatedData={updatedData}
            setupdatedData={setupdatedData}
          />
        </div>
      </div>
    </>
  );
};

export default List;
