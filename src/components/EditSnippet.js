import React, { Component } from "react";
import Editor from "react-simple-code-editor";
import axios from "axios";

import { languageAlias } from "../supported-languages";
import { highlight, languages } from "prismjs/components/prism-core";

import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-markup";
import "prismjs/components/prism-css";
// -- languages below are commented out b/c they are casuing problems and will be replaced when we install react-prism-renderer
// import "prismjs/components/prism-c";
// import "prismjs/components/prism-cpp";
// import "prismjs/components/prism-csharp";
// import "prismjs/components/prism-php-extras";
// import "prismjs/components/prism-php";
// import "prismjs/components/prism-python";
// import "prismjs/components/prism-aspnet";
// import "prismjs/components/prism-bash";
// import "prismjs/components/prism-java";
// import "prismjs/components/prism-git";

// import "prismjs/themes/prism.css";
import "../assets/css/prism-okadia.css";
import "./EditSnippet.css";
import Error from "./Error";

class EditSnippet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      code: "",
      note: "",
      language_id: "4",
      language_alias: "js",
      id: props.match.params.id,
      error: null,
      loadError: false,
      loadErrorMessage: "",
    };
  }

  componentDidMount() {
    if (!this.props.token) return;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.props.token}`,
    };
    axios
      .get(`/api/user/snippets/${this.state.id}`, { headers })
      .then((response) => {
        let resLangId = response.data.snippet.language_id; //We should look at storing all the ID as numbers
        resLangId = resLangId.toString();
        this.setState({
          title: response.data.snippet.title,
          code: response.data.snippet.snippet,
          note: response.data.snippet.note,
          language_id: resLangId,
          // language_alias: languageAlias[response.data.snippet.language_id],
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loadError: true,
          loadErrorMessage: err.response.data.message,
        });
      });
  }

  // if updating language selection, this grabs the language alias using its ID
  componentDidUpdate(prevProps, prevState) {
    if (prevState.language_id !== this.state.language_id) {
      let selectedLanguage = languageAlias[this.state.language_id];

      this.setState({
        ...this.state,
        language_alias: selectedLanguage,
      });
    }
  }

  _handleUpdate = (field, val) => {
    this.setState({
      ...this.state,
      [field]: val,
    });
  };

  _handleClick = (event) => {
    event.preventDefault();
    let updatedSnippet = {
      title: this.state.title,
      snippet: this.state.code,
      note: this.state.note,
      language_id: this.state.language_id,
    };
    this.onSubmit(updatedSnippet);
  };

  onSubmit = (data) => {
    data = JSON.stringify(data);

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.props.token}`,
    };
    axios
      .put(`/api/user/snippets/${this.state.id}`, data, { headers })
      .then((response) => {
        this.props.history.push("/dashboard/library");
      })
      .catch((err) => {
        if (err.response) {
          this.setState({
            ...this.state,
            error: err.response.data.error,
          });
        } else {
          this.setState({
            ...this.state,
            error: "Something went wrong",
          });
        }
      });
  };

  render() {
    return (
      <div className="EditSnippet">
        <div className="box">
          {this.state.loadError ? (
            <Error errorMessage={this.state.loadErrorMessage} />
          ) : (
            <form>
              <div className="field has-text-left">
                <label className="label">Title</label>
                <div className="control">
                  <input
                    defaultValue={this.state.title}
                    onBlur={(event) =>
                      this._handleUpdate("title", event.target.value)
                    }
                    className="input"
                    type="text"
                  />
                </div>
              </div>
              <label className="label has-text-left">Code</label>
              <Editor
                value={this.state.code}
                onValueChange={(code) => this.setState({ code })}
                highlight={(code) =>
                  highlight(code, languages[this.state.language_alias])
                }
                padding={10}
                placeholder="//paste your code here..."
                style={{
                  fontFamily: '"Fira Code", "Fira Mono", monospace',
                  fontSize: ".8rem",
                  // backgroundColor: "#F5F5F5",
                  backgroundColor: "#282822",
                  borderRadius: ".33rem",
                  minHeight: "20em",
                  overflow: "auto",
                }}
              />
              <p className="help is-danger">
                {this.state.error ? this.state.error : ""}
              </p>
              <br />
              <div className="field has-text-left">
                <label className="label">Note</label>
                <div className="control">
                  <textarea
                    defaultValue={this.state.note}
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
              <div className="field is-grouped is-grouped-right">
                <div className="control">
                  <div className="select">
                    <select
                      value={this.state.language_id}
                      onChange={(event) =>
                        this._handleUpdate("language_id", event.target.value)
                      }
                      id="selectLanguage"
                    >
                      <option value="1">Markup (HTML)</option>
                      <option value="2">CSS</option>
                      <option value="3">C-Like</option>
                      <option value="4">JavaScript</option>
                      {/* <option value="5">ASP.NET</option>
                    <option value="6">Bash</option>
                    <option value="7">C</option>
                    <option value="8">C#</option>
                    <option value="9">C++</option>
                    <option value="10">Git</option>
                    <option value="11">Java</option>
                    <option value="12">JSX (React)</option>
                    <option value="13">Python</option>
                    <option value="14">PHP</option> */}
                    </select>
                  </div>
                </div>
                <div className="control">
                  <button
                    className="button d-shadow"
                    onClick={(event) => this._handleClick(event)}
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default EditSnippet;
