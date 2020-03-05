import React, { Component, useState } from "react";
import Detail from "./../detail/Detail";
import { Route } from "react-router-dom";
import Filter from "./../filter/Filter";
import { withRouter } from "react-router";
import Search from "@material-ui/icons/Search";
import "./SearchBar.css";

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('')
    const [showFilters, setShowFilters] = useState(false)
    this.handleSubmit = this.handleSubmit.bind(this)

    handleChange = (event) => {
        const inputValue = event.target.value;
        setSearchQuery(inputValue)

        if (!inputValue) {
            return ''
        }
    }

    handleSubmit = (event) => {
        const {searchQuery} = ''
        event.preventDefault()
        const value = searchQuery;
        setSearchQuery('')
        if (value) {
            return this.props.history.push(`/detail/${searchQuery}`)
        }

    }

    handleFilter = () => {
        setShowFilters(false)
    }

    return (
        <div className="searchBar">
            <form className="searchForm" onSubmit={this.handleSubmit}>
            <input
                placeholder="Search Pokemon"
                value={searchQuery}
                onChange={this.handleChange}
                className="inputField"
            />

            <button className="submitButton">
                <Search style={{ fontSize: 13 }} />
            </button>
            </form>
            {this.props.location.pathname === "/" && (
            <button
                className="filterButton"
                onClick={() => {
                    setShowFilters(!showFilters)
                }}
            >
                Filter
            </button>
            )}
            {showFilters && (
            <Filter showFilter={this.handleFilter} filter={this.props.filter} />
            )}
            <Route exact path="detail/:name" component={Detail} />
        </div>
    );
}

export default withRouter(SearchBar);