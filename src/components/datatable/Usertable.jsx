import "./datatable.scss";
import { DataGrid, GridSearchIcon, GridToolbar } from "@mui/x-data-grid";
import {
  userColumns,
  productColumns,
  orderColumns,
  profileColumns,
  statColumns,
} from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { Clear, DeleteForever, Edit, Undo } from "@mui/icons-material";
import { categoryList, statusList } from "./constants";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Usertable = ({ col }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, col),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setupdatedData(list);
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

  const [searchInput, setSearchInput] = useState("");

  const [category, setCategory] = useState(null);
  const [status, setStatus] = useState(null);

  const [price, setPrice] = useState(null);
  const [units, setUnits] = useState(null);

  const [updatedData, setupdatedData] = useState(data);
  const [resultsFound, setResultsFound] = useState(true);

  const handleCategory = (e, value) => setCategory(e.target.value);
  const handleStatus = (e, value) => setStatus(e.target.value);

  const handlePrice = (e, value) => setPrice(e.target.value);
  const handleUnits = (e, value) => setUnits(e.target.value);

  const handleSearch = (e, value) => setSearchInput(e.target.value);

  const handleUndo = (e, value) => {
    if (category !== "Category") {
      setCategory("Category");
    }
    if (status !== "Status") {
      setStatus("Status");
    }
    if (price !== "Price") {
      setPrice("Price");
    }
    if (units !== "Units") {
      setUnits("Units");
    }
  };

  const applyFilters = () => {
    let updatedData = data;

    if (searchInput) {
      updatedData = updatedData.filter(
        (item) =>
          item.title.toLowerCase().search(searchInput.toLowerCase().trim()) !==
          -1
      );
    }
    if (status) {
      updatedData = updatedData.filter((item) =>
        status === "Status" ? setStatus(null) : item.status === status
      );
    }
    if (category) {
      updatedData = updatedData.filter((item) =>
        category === "Category" ? setCategory(null) : item.category === category
      );
    }
    if (price) {
      setUnits(null);
      updatedData = [...updatedData].sort((a, b) =>
        price === "Descending" ? b.price - a.price : a.price - b.price
      );
    }
    if (units) {
      setPrice(null);
      updatedData = [...updatedData].sort((a, b) =>
        units === "Descending" ? b.units - a.units : a.units - b.units
      );
    }

    setupdatedData(updatedData);
    !updatedData.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [status, category, price, units, searchInput]);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link
              to={"/" + col + "/" + params.row.id}
              style={{ textDecoration: "none" }}
            >
              <div className="updateButton">
                <Edit className="icon" />
              </div>
            </Link>

            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              <DeleteForever className="icon" />
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="datatable">
        <div className="datatableTitle">
          {col === "users" ? (
            "Users"
          ) : col === "products" ? (
            <>
              Products
              <div>
                <span style={{ display: "flex", alignItems: "center" }}>
                  <div className="search link">
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={handleSearch}
                    className=" "
                  />
                  <SearchOutlinedIcon
                    className=""
                
                  />
                  </div>

                  <select
                    value={category}
                    onChange={handleCategory}
                    className="link"
                  >
                    <option default>Category</option>
                    {categoryList.map(({ label, id, value }) => (
                      <option id={id} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>

                  <select
                    value={status}
                    onChange={handleStatus}
                    className="link"
                  >
                    <option default>Status</option>

                    {statusList.map(({ label, id, value }) => (
                      <option id={id} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>

                  <select value={price} onChange={handlePrice} className="link">
                    <option default hidden>
                      Price
                    </option>
                    <option value="Ascending">Lowest</option>
                    <option value="Descending">Highest</option>
                  </select>

                  <select value={units} onChange={handleUnits} className="link">
                    <option default hidden>
                      Units
                    </option>
                    <option value="Ascending">Lowest</option>
                    <option value="Descending">Highest</option>
                  </select>

              
                    <Undo onClick={handleUndo} className="link" style={{fontSize: "22px"}} />
              
                </span>
              </div>
            </>
          ) : col === "orders" ? (
            "Orders"
          ) : col === "profile" ? (
            "Profile"
          ) : col === "stats" ? (
            "Stats"
          ) : (
            "Delivery"
          )}

          <Link to={"/" + col + "/new"} className="link">
            Add
          </Link>
        </div>

        {col === "products" ? (
          <DataGrid
            className="datagrid"
            rows={updatedData}
            columns={productColumns.concat(actionColumn)}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
            // components={{ Toolbar: GridToolbar }}
            // componentsProps={{
            //   toolbar: {
            //     showQuickFilter: true,
            //     quickFilterProps: { debounceMs: 500 },
            //   },
            // }}
          />
        ) : col === "users" ? (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={userColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            // components={{ Toolbar: GridToolbar }}
            // componentsProps={{
            //   toolbar: {
            //     showQuickFilter: true,
            //     quickFilterProps: { debounceMs: 500 },
            //   },
            // }}
          />
        ) : col === "orders" ? (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={orderColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            // components={{ Toolbar: GridToolbar }}
            // componentsProps={{
            //   toolbar: {
            //     showQuickFilter: true,
            //     quickFilterProps: { debounceMs: 500 },
            //   },
            // }}
          />
        ) : col === "stats" ? (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={statColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            // components={{ Toolbar: GridToolbar }}
            // componentsProps={{
            //   toolbar: {
            //     showQuickFilter: true,
            //     quickFilterProps: { debounceMs: 500 },
            //   },
            // }}
          />
        ) : (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={profileColumns.concat(actionColumn)}
            pageSize={9}
            rowsPerPageOptions={[9]}
            checkboxSelection
            // components={{ Toolbar: GridToolbar }}
            // componentsProps={{
            //   toolbar: {
            //     showQuickFilter: true,
            //     quickFilterProps: { debounceMs: 500 },
            //   },
            // }}
          />
        )}
      </div>
    </>
  );
};

export default Usertable;
