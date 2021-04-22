import React, { Component } from "react";
import Prism from "prismjs";
import "../css/prism.css";

export class Snippet extends Component {
  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    return (
      <div>
        <pre>
          <code className="language-javascript">
            {`
    /* Sample js below formatted with Prism */
    onSubmit(e) {
      e.preventDefault();
      const job = {
        title: 'Developer',
        company: 'Facebook' 
        };
      }
  `}
          </code>
        </pre>
      </div>
    );
  }
}
