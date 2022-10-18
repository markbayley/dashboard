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
import { categoryList, countryList, paymentList, statusList } from "./constants";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Usertable = ({ col }) => {

  const [data, setData] = useState([]);
  console.log(data, 'Usertable')
 //Get row data for users/products/columns for table component
  useEffect(() => {
    const fetchData = async() => {
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
  }
  fetchData()
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

  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const [price, setPrice] = useState('');
  const [units, setUnits] = useState('');

  const [country, setCountry] = useState('');
  const [displayName, setName] = useState('');

  const [payment, setPayment] = useState('');
  const [customer, setCustomer] = useState('');
  const [amount, setAmount] = useState('');

  const [updatedData, setupdatedData] = useState(data);
  const [resultsFound, setResultsFound] = useState(true);

  const handleCategory = (e, value) => setCategory(e.target.value);
  const handleStatus = (e, value) => setStatus(e.target.value);

  const handlePrice = (e, value) => setPrice(e.target.value);
  const handleUnits = (e, value) => setUnits(e.target.value);

  const handleCountry = (e, value) => setCountry(e.target.value);
  const handleName = (e, value) => setName(e.target.value);

  const handlePayment = (e, value) => setPayment(e.target.value);
  const handleCustomer = (e, value) => setCustomer(e.target.value);
  const handleAmount = (e, value) => setAmount(e.target.value);

  const handleSearch = (e, value) => setSearchInput(e.target.value);

  const handleUndo = () => {
    setCategory("Category");
    setStatus("Status");
    setPrice("Price");
    setUnits("Units");
    setCountry("Country");
    setName("Name");
    setPayment("Payment");
    setCustomer("Customer");
    setAmount("Amount");
    setSearchInput("");
  };

  const applyFilters = () => {
    let updatedData = data;
    const lowercasedValue = searchInput.toLowerCase().trim();
    const excludeColumns = ["id"];
    if (searchInput) {
      updatedData = updatedData.filter((item) => {
        return Object.keys(item).some((key) =>
          excludeColumns.includes(key)
            ? false
            : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
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
        units === "Highest" ? b.units - a.units : a.units - b.units
      );
    }
    if (country) {
      updatedData = updatedData.filter((item) =>
        country === "Country" ? setCountry(null) : item.country === country
      );
    }
    if (payment) {
      updatedData = updatedData.filter((item) =>
        payment === "Payment" ? setPayment(null) : item.payment === payment
      );
    }
    if (displayName) {
      updatedData = [...updatedData].sort((a, b) =>
        displayName === "Descending" ? b.displayName > a.displayName ? 1 : -1 : a.displayName > b.displayName ? 1 : -1,
      );
    }
    if (customer) {
      setAmount(null);
      updatedData = [...updatedData].sort((a, b) =>
        customer === "Descending" ? b.customer > a.customer ? 1 : -1 : a.customer > b.customer ? 1 : -1,
      );
    }
    if (amount) {
      setCustomer(null);
      updatedData = [...updatedData].sort((a, b) =>
        amount === "Highest" ? b.amount > a.amount ? 1 : -1 : a.amount > b.amount ? 1 : -1,
      );
    }

    setupdatedData(updatedData);
    !updatedData.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [status, category, price, units, country, displayName, customer, payment, amount, searchInput]);

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
            <>
              Users
              <div>
                <span style={{ display: "flex", alignItems: "center" }}>
          

                  <select
                    value={country}
                    onChange={handleCountry}
                    className="link"
                  >
                    <option default>Country</option>

                    {countryList.map(({ label, id, value }) => (
                      <option id={id} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>

                  <select value={displayName} onChange={handleName} className="link">
                    <option default>Name</option>
                    <option value="Ascending">A-Z</option>
                    <option value="Descending">Z-A</option>
                  </select>

                  <Undo
                    onClick={handleUndo}
                    className="link undo"
                    style={{ fontSize: "20px" }}
                  />
                </span>
              </div>
            </>
          ) : col === "products" ? (
            <>
              Products
              <div>
                <span style={{ display: "flex", alignItems: "center" }}>
               

                  <select
                    value={category}
                    onChange={handleCategory}
                    className="link"
                  >
                    <option default>Category</option>
                    {categoryList.map(({ label, id, value }) => (
                      <option key={id} value={value}>
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
                      <option key={id} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>

                  <select value={price} onChange={handlePrice} className="link">
                    <option key={1} default>Price</option>
                    <option key={2} value="Ascending">Lowest</option>
                    <option key={3}value="Descending">Highest</option>
                  </select>

                  <select value={units} onChange={handleUnits} className="link">
                    <option key={1} default>Units</option>
                    <option key={2} value="Lowest">Lowest</option>
                    <option key={3} value="Highest">Highest</option>
                  </select>

                  <Undo
                    onClick={handleUndo}
                    className="link undo"
                    style={{ fontSize: "20px" }}
                  />
                </span>
              </div>
            </>
          ) : col === "orders" ? (
            <>
            Orders
            <div>
              <span style={{ display: "flex", alignItems: "center" }}>
        

                <select
                  value={payment}
                  onChange={handlePayment}
                  className="link"
                >
                  <option default>Payment</option>

                  {paymentList.map(({ label, id, value }) => (
                    <option key={id} value={value}>
                      {label}
                    </option>
                  ))}
                </select>

                <select value={customer} onChange={handleCustomer} className="link">
                  <option key={1} default>Customer</option>
                  <option key={2} value="Ascending">A-Z</option>
                  <option key={3} value="Descending">Z-A</option>
                </select>

                <select value={amount} onChange={handleAmount} className="link">
                  <option key={1} default>Amount</option>
                  <option key={2} value="Lowest">Lowest</option>
                  <option key={3} value="Highest">Highest</option>
                </select>

                <Undo
                  onClick={handleUndo}
                  className="link undo"
                  style={{ fontSize: "20px" }}
                />
              </span>
            </div>
          </>
          ) : col === "profile" ? (
            "Profile"
          ) : col === "stats" ? (
            "Stats"
          ) : (
            "Delivery"
          )}

<div className="search link">
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchInput}
                      onChange={handleSearch}
                    />
                    <SearchOutlinedIcon />
                  </div>

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
            rows={updatedData}
            columns={userColumns.concat(actionColumn)}
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
        ) : col === "orders" ? (
          <DataGrid
            className="datagrid"
            rows={updatedData}
            columns={orderColumns.concat(actionColumn)}
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
        ) : col === "stats" ? (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={statColumns.concat(actionColumn)}
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
        ) : (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={profileColumns.concat(actionColumn)}
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
        )}
      </div>
    </>
  );
};

export default Usertable;
