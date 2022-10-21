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
import {
  categoryList,
  countryList,
  deliveryList,
  paymentList,
  statusList,
} from "./constants";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import UserFilter from "./UserFilter";
import ProductFilter from "./ProductFilter";
import OrderFilter from "./OrderFilter";

const Usertable = ({
  col,
  handleDelete,
  data,
  updatedData,
  setupdatedData,
}) => {

  const [searchInput, setSearchInput] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [price, setPrice] = useState("");
  const [units, setUnits] = useState("");
  const [country, setCountry] = useState("");
  const [displayName, setName] = useState("");
  const [payment, setPayment] = useState("");
  const [customer, setCustomer] = useState("");
  const [amount, setAmount] = useState("");
  const [delivery, setDelivery] = useState("");

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
  const handleDelivery = (e, value) => setDelivery(e.target.value);

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
    setDelivery("Delivery")
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
    if (delivery) {
      updatedData = updatedData.filter((item) =>
        delivery === "Delivery" ? setDelivery(null) : item.delivery === delivery
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
        displayName === "Descending"
          ? b.displayName > a.displayName
            ? 1
            : -1
          : a.displayName > b.displayName
          ? 1
          : -1
      );
    }
    if (customer) {
      setAmount(null);
      updatedData = [...updatedData].sort((a, b) =>
        customer === "Descending"
          ? b.customer > a.customer
            ? 1
            : -1
          : a.customer > b.customer
          ? 1
          : -1
      );
    }
    if (amount) {
      setCustomer(null);
      updatedData = [...updatedData].sort((a, b) =>
        amount === "Highest"
          ? b.amount > a.amount
            ? 1
            : -1
          : a.amount > b.amount
          ? 1
          : -1
      );
    }

    setupdatedData(updatedData);
    !updatedData.length ? setResultsFound(false) : setResultsFound(true);
  };

  useEffect(() => {
    applyFilters();
  }, [
    status,
    category,
    price,
    units,
    country,
    displayName,
    customer,
    payment,
    amount,
    searchInput,
    delivery
  ]);

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
            <UserFilter
              title="Users"
              country={country}
              handleCountry={handleCountry}
              displayName={displayName}
              handleName={handleName}
              countryList={countryList}
              handleUndo={handleUndo}
            />
          ) : col === "products" ? (
            <ProductFilter
              title="Products"
              category={category}
              handleCategory={handleCategory}
              categoryList={categoryList}
              status={status}
              handleStatus={handleStatus}
              statusList={statusList}
              price={price}
              handlePrice={handlePrice}
              units={units}
              handleUnits={handleUnits}
              handleUndo={handleUndo}
            />
          ) : col === "orders" ? (
            <OrderFilter
              title="Orders"
              payment={payment}
              handlePayment={handlePayment}
              customer={customer}
              handleCustomer={handleCustomer}
              paymentList={paymentList}
              amount={amount}
              handleAmount={handleAmount}
              handleUndo={handleUndo}
              delivery={delivery}
              deliveryList={deliveryList}
              handleDelivery={handleDelivery}
            />
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
            className="cellWithStatus datagrid"
            rows={updatedData}
            columns={productColumns.concat(actionColumn)}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        ) : col === "users" ? (
          <DataGrid
            className="datagrid"
            rows={updatedData}
            columns={userColumns.concat(actionColumn)}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        ) : col === "orders" ? (
          <DataGrid
           className="cellWithStatus datagrid"
            rows={updatedData}
            columns={orderColumns.concat(actionColumn)}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        ) : col === "stats" ? (
          <DataGrid
            className="datagrid"
            rows={data}
            columns={statColumns.concat(actionColumn)}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
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
