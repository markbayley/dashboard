import { Undo } from "@mui/icons-material";
import React from "react";

const ProductFilter = ({
  title,
  category,
  handleCategory,
  categoryList,
  status,
  handleStatus,
  statusList,
  price,
  handlePrice,
  units,
  handleUnits,
  handleUndo
}) => {
  return (
    <>
      {title}
      <div>
        <span style={{ display: "flex", alignItems: "center" }}>
          <select value={category} onChange={handleCategory} className="link">
            <option default>Category</option>
            {categoryList.map(({ label, id, value }) => (
              <option key={id} value={value}>
                {label}
              </option>
            ))}
          </select>

          <select value={status} onChange={handleStatus} className="link">
            <option default>Status</option>

            {statusList.map(({ label, id, value }) => (
              <option key={id} value={value}>
                {label}
              </option>
            ))}
          </select>

          <select value={price} onChange={handlePrice} className="link">
            <option key={1} default>
              Price
            </option>
            <option key={2} value="Ascending">
              Lowest
            </option>
            <option key={3} value="Descending">
              Highest
            </option>
          </select>

          <select value={units} onChange={handleUnits} className="link">
            <option key={1} default>
              Units
            </option>
            <option key={2} value="Lowest">
              Lowest
            </option>
            <option key={3} value="Highest">
              Highest
            </option>
          </select>

          <Undo
            onClick={handleUndo}
            className="link undo"
            style={{ fontSize: "20px" }}
          />
        </span>
      </div>
    </>
  );
};

export default ProductFilter;
