import { Undo } from "@mui/icons-material";
import React from "react";

const UserFilter = ({
  title,
  country,
  handleCountry,
  displayName,
  handleName,
  countryList,
  handleUndo
}) => {
  return (
    <>
      {title}
      <div>
        <span style={{ display: "flex", alignItems: "center" }}>
          <select value={country} onChange={handleCountry} className="link">
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
  );
};

export default UserFilter;
