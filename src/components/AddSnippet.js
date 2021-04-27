import React, { Component } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

const code = `onSubmit(e) {
    e.preventDefault();
    const job = {
      title: 'Developer',
      company: 'Facebook'  };`;
class AddSnippet extends Component {
  state = { code };
  render() {
    return (
      <div>
        <Editor
          value={this.state.code}
          onValueChange={(code) => this.setState({ code })}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            backgroundColor: "grey",
          }}
        />
      </div>
    );
  }
}

export default AddSnippet;
