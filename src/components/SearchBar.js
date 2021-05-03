import React, { Component } from "react";
import axios from "axios";
import "./SearchBar.css";
import Snippet from "./Snippet";
import { languageAlias } from "../supported-languages";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      snippetsResponse: [],
      validation: null,
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
    if (this.state.title == "") {
      this.setState({
        ...this.state,
        validation: "Must enter a value to search",
      });
      return;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.props.token}`,
    };
    axios
      .get(`/api/search?title=${this.state.title}`, {
        headers,
      })
      .then((response) => {
        if (response.data.snippets.length === 0) {
          this.setState({
            ...this.state,
            validation: null,
            snippetsResponse: "No results found",
          });
        } else {
          this.setState({
            ...this.state,
            validation: null,
            snippetsResponse: response.data.snippets,
          });
        }
      });
  };

  renderSnippets = () => {
    if (this.state.snippetsResponse.length === 0) {
      return (
        <div className="columns is-vcentered has-text-centered pt-5">
          <div className="column">
            <h5 className="title is-size-4">
              Search your library by title for helpful code snippets!
            </h5>
          </div>
        </div>
      );
    }
    if (this.state.snippetsResponse == "No results found") {
      return (
        <div className="columns is-vcentered has-text-centered pt-5">
          <div className="column">
            <h5 className="title is-size-4">No results found!</h5>
          </div>
        </div>
      );
    }
    return (
      <>
        {this.state.snippetsResponse.map((snippet) => {
          let languageName = languageAlias[snippet.language_id.toString()];
          return (
            <Snippet
              key={snippet.id}
              id={snippet.id}
              title={snippet.title}
              code={snippet.snippet}
              note={snippet.note}
              langId={snippet.language_id}
              langName={languageName}
              token={this.props.token}
            />
          );
        })}
      </>
    );
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
          <p className="help is-danger">
            {this.state.validation ? this.state.validation : ""}
          </p>
        </div>
        {this.renderSnippets()}
      </div>
    );
  }
}

export default SearchBar;
