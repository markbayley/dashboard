import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import {
  userColumns,
  productColumns,
  orderColumns,
  profileColumns,
} from "../../datatablesource";
import { Link, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import Chart from "../chart/Chart";
import Table from "../../components/table/Table";
import { Clear } from "@mui/icons-material";

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

  const handleView = async (id) => {
    try {
      await getDoc(doc(db, col, id));
      setData(data.filter((item) => item.id === id));
    } catch (err) {
      console.log(err);
    }
  };

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
            <Link to={"/" + col} style={{ textDecoration: "none" }}>
              <div
                className="updateButton"
                onClick={() => handleView(params.row.id)}
              >
                Edit
              </div>
            </Link>

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
              <div className="updateButton">View</div>
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
          {col === "users"
            ? "Users"
            : col === "products"
            ? "Products"
            : col === "orders"
            ? "Orders"
            : col === "profile"
            ? "Profile"
            : "Delivery"}

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
        ) : col === "users" ? (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        ) : col === "orders" ? (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={orderColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
          />
        ) : (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={profileColumns.concat(actionColumn)}
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
