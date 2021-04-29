import React, { Component } from "react";
import Editor from "react-simple-code-editor";
import axios from "axios";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
// import "prismjs/themes/prism.css";
import "./AddSnippet.css";

class AddSnippet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      code: "//Paste Your Snippit Here",
      note: "",
      language_id: 4,
    };
  }

  _handleUpdate = (field, val) => {
    console.log("setting updated. value:" + val);
    this.setState({
      ...this.state, // do i need this spread?
      [field]: val,
    });
  };

  _handleClick = (event) => {
    event.preventDefault();
    console.log("Button Clicked");

    console.log(event);
    console.log(this.state.code);
    let newSnippet = {
      title: this.state.title,
      snippet: this.state.code,
      note: this.state.note,
      language_id: this.state.language_id,
    };
    this.onSubmit(newSnippet);
  };

  onSubmit = (data) => {
    console.log("data " + data);
    data = JSON.stringify(data);
    console.log(data);
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.props.token}`,
    };
    axios
      .post("http://localhost:3001/api/user/snippets", data, { headers })
      .then((response) => {
        console.log(response);
        this.props.history.push("/dashboard");
      });
  };

  render() {
    return (
      <div className="AddSnippet">
        {/* maybe swap this component for a different code editor -- or add in react-prism-renderer*/}
        <div className="box">
          <form>
            <div className="field has-text-left">
              <label className="label">Title</label>
              <div className="control">
                <input
                  onBlur={(event) =>
                    this._handleUpdate("title", event.target.value)
                  }
                  className="input"
                  type="text"
                  placeholder="Give your snippit a title..."
                />
              </div>
            </div>
            <label className="label has-text-left">Code</label>
            <Editor
              value={this.state.code}
              onValueChange={(code) => this.setState({ code })}
              highlight={(code) => highlight(code, languages.js)}
              padding={10}
              style={{
                fontFamily: '"Dank Mono", "Fira Mono", monospace',
                fontSize: 12,
                backgroundColor: "grey",
                minHeight: "20em",
              }}
            />
            <br/>
            <div className="field has-text-left">
              <label className="label">Note</label>
              <div className="control">
                <textarea
                  onBlur={(event) =>
                    this._handleUpdate("note", event.target.value)
                  }
                  className="textarea"
                  name="note"
                  placeholder="Add a note about this snippet"
                  rows="4"
                ></textarea>
              </div>
            </div>
            <div className="control">
              <button
                className="button d-shadow"
                onClick={(event) => this._handleClick(event)}
                type="submit"
              >
                Add To Library
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddSnippet;
