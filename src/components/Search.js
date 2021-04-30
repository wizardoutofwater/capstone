import React, { Component } from "react";
import SearchBar from "./SearchBar.js";

class Search extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <SearchBar {...this.props} token={this.props.token} />;
  }
}

export default Search;
