import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, productColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";

const Usertable = ({ col }) => {
  const [data, setData] = useState([]);
  console.log(data, "data");

  const params = useParams();
  console.log(params, "params");

  useEffect(() => {
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
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
            <Link
              to={"/" + col + "/" + params.row.id}
              style={{ textDecoration: "none" }}
            >
              <div className="updateButton">Edit</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="datatable">
        <div className="datatableTitle">
          {col === "users" ? "Users" : "Products"}

          <Link to={"/" + col + "/new"} className="link">
            Add New
          </Link>
        </div>

        {col === "products" ? (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={productColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        ) : (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        )}
      </div>
    </>
  );
};

export default Usertable;
