import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows, productColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, updateCurrentUser, updateProfile } from "firebase/auth";

const Usertable = ({col}) => {
  console.log(col, "col-usertable")

  const [data, setData] = useState([]);

  useEffect(() => {
    // const fetchData = async () => {
    //   let list = [];
    //   try {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //       list.push({ id: doc.id, ...doc.data() });
    //     });
    //     setData(list);
    //     console.log(list);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };
    // fetchData();

    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, col),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
  }, []);

  
  /* function to update document in firestore */
// const handleUpdate = async (e, id) => {
//   // e.preventDefault()
//   const taskDocRef = doc(db, col, id)
//   try{
//     await updateDoc(taskDocRef, {
//       title: id.title,
//       description: id.description
//     })
//     // onClose()
//   } catch (err) {
//     alert(err)
//   }    
// }








  console.log(data, "DaTa - userTable")





  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, col, id));
      setData(data.filter((item) => item.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params, id) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <Link to={"/" + col + "/test"} style={{ textDecoration: "none" }}>
              <div className="updateButton"
              
              >Update</div>
            
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {col === "users" ? 'Users' : 'Products' }
        <Link to={"/" + col + "/new"} className="link">
          Add New
        </Link>
      </div>

   



      { col === "products" ?
      <DataGrid
        className="datagrid"
        rows={data}
        columns={productColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
      : 
      <DataGrid
      className="datagrid"
      rows={data}
      columns={userColumns.concat(actionColumn)}
      pageSize={9}
      rowsPerPageOptions={[9]}
      checkboxSelection
    /> }
    </div>
  );
};

export default Usertable;
