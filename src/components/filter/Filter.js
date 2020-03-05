import React, { useRef, useState, useEffect } from "react";
import "./Filter.css";

const Filter = props => {
  const [filterBoxes, setFilterBoxes] = useState([]);
  const node = useRef();
  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    props.showFilter();
  };
  useEffect(() => {
    if (props.showFilter) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const onChanges = event => {
    const newv = event.target;
    const value = newv.value;
    if (newv.checked === true) {
      if (!filterBoxes.includes(value)) {
        setFilterBoxes([...filterBoxes, value]);
      }
    }
    if (newv.checked === false) {
      if (filterBoxes.includes(newv.value)) {
        let newArray = filterBoxes;
        let filtered = newArray.filter(e => e !== value);
        setFilterBoxes(filtered);
      }
    }
  };
  const submitFilters = event => {
    event.preventDefault();
    const typeFilters = filterBoxes;
    props.filter(typeFilters);
    props.showFilter();
  };

  const types = [
    "fire",
    "water",
    "ice",
    "dragon",
    "fighting",
    "flying",
    "grass",
    "rock",
    "ground",
    "fairy",
    "poison",
    "dark",
    "ghost",
    "electric",
    "steel",
    "bug",
    "normal",
    "psychic"
  ];
  return (
    <div ref={node} className="typeList">
      <div className="typesContainer">
        {types.map((types, i) => {
          return (
            <label key={types} className="typeNames">
              <input
                type="checkbox"
                onChange={e => onChanges(e)}
                value={types}
              />{" "}
              {types}
            </label>
          );
        })}
      </div>
      <div className="filter-btn-container">
        <button className="filter-btn" onClick={submitFilters}>
          {" "}
          Done{" "}
        </button>
        <button className="filter-btn" onClick={submitFilters}>
          Clear
        </button>
      </div>
    </div>
  );
};

export default Filter;
