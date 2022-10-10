export const userColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Username",
    width: 200,
    editable: true,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true
  },

  {
    field: "address",
    headerName: "Address",
    width: 200,
    editable: true
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
    editable: true
  },
  {
    field: "country",
    headerName: "Country",
    width: 150,
    editable: true,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.country}`}>
          {params.row.country}
        </div>
      );
    },
  },
];


export const productColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "product",
    headerName: "Product",
    width: 100,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="product" />
          {params.row.productname}
        </div>
      );
    },
  },
  {
    field: "title",
    headerName: "Title",
    width: 150,
  },

  {
    field: "description",
    headerName: "Description",
    width: 250,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "units",
    headerName: "Units",
    width: 100,
  },
  {
    field: "sold",
    headerName: "Sold",
    width: 100,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];



export const orderColumns = [
  { field: "id", headerName: "TrackingID", width: 70 },
  {
    field: "product",
    headerName: "Product",
    width: 175,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="product" />
          {params.row.productname}
        </div>
      );
    },
  },
  {
    field: "customer",
    headerName: "Customer",
    width: 150,
  },

  {
    field: "date",
    headerName: "Date",
    width: 150,
  },

  {
    field: "amount",
    headerName: "Amount",
    width: 150,
  },
  {
    field: "payment",
    headerName: "Payment Method",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];


export const profileColumns = [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "Username",
    width: 200,
    editable: true,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
    editable: true
  },

  {
    field: "address",
    headerName: "Address",
    width: 200,
    editable: true
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
    editable: true
  },
  {
    field: "country",
    headerName: "Country",
    width: 150,
    editable: true,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.country}`}>
          {params.row.country}
        </div>
      );
    },
  },
];



export const statColumns = [
  { field: "id", headerName: "TrackingID", width: 70 },
  {
    field: "product",
    headerName: "Product",
    width: 175,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="product" />
          {params.row.productname}
        </div>
      );
    },
  },
  {
    field: "customer",
    headerName: "Customer",
    width: 150,
  },

  {
    field: "date",
    headerName: "Date",
    width: 150,
  },

  {
    field: "amount",
    headerName: "Amount",
    width: 150,
  },
  {
    field: "category",
    headerName: "Category",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

