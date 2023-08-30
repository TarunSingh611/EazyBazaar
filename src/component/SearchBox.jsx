import { useState } from "react";
import { FiSearch } from "react-icons/fi"; // Import the search icon from react-icons

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    // You can implement your search logic here
    // For now, we'll just log the search term
    console.log("Searching for:", searchTerm);

    // If you want to pass the search term to a parent component, you can do it like this:
    // onSearch(searchTerm);
  };

  return (
    <div className="search-box" style={searchBoxStyle}>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        style={inputStyle}
      />
      <button onClick={handleSearch} style={buttonStyle}>
        <FiSearch />
      </button>
    </div>
  );
};

// Define inline styles
const searchBoxStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#f2f2f2",
  borderRadius: "4px",
  width: "300px",
};

const inputStyle = {
  border: "none",
  outline: "none",
  flex: 1,
  padding: "10px",
  fontSize: "16px",
  backgroundColor: "transparent",
};

const buttonStyle = {
  padding: "6px",

  cursor: "pointer",
};

export default SearchBox;
