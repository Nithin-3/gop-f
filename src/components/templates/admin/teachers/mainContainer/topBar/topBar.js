import React, { useState } from "react";
import styles from "./styles.module.css";

const TopBar = (props) => {
  const [search, setSearch] = useState(props.searchInput);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      props.setSearchInput(search);
    }
  }

  return (
    <>
      <div className={styles.topBar}>
        <h3>{props.verificationType} Verification</h3>
        <div className={styles.searchInputGroup}>
          <i className="fas fa-search"></i>

          <input type="text" placeholder="search.."
            value={search}
            onChange={(e) => { setSearch(e.target.value) }}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </>
  );
};

export default TopBar;
