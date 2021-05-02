import React, { Component } from "react";
import axios from "axios";
import "./SearchBar.css";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
    };
  }

  _handleUpdate = (field, val) => {
    this.setState({
      ...this.state,
      [field]: val,
    });
  };

  _handleClick = (event) => {
    event.preventDefault();
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.props.token}`,
    };
    axios
      .get(`/api/search?title=${this.state.title}`, {
        headers,
      })
      .then((response) => {
        console.log(response);
      });
  };

  render() {
    return (
      <div className="SearchBar">
        <div className="box">
          <form className="field is-grouped">
            <p className="control is-expanded">
              <input
                className="input"
                name="search"
                type="text"
                placeholder="Search snippets..."
                onChange={(event) =>
                  this._handleUpdate("title", event.target.value)
                }
              />
            </p>
            <button
              className="button d-shadow"
              onClick={(event) => this._handleClick(event)}
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default SearchBar;
