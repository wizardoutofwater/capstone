import React, { Component } from "react";
import Prism from "prismjs";


export class Snippet extends Component {

  componentDidMount() {
    Prism.highlightAll();
  }

  render() {
    return (
      <div className='Snippet'> 
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

// function Snippet(props){
//   const snippetList = props.snippets.map((snippet) =>
//   <div key={snippet.id}>
//     <h3>{snippet.title}</h3>
//     <pre><code>{snippet.code}</code></pre>
//     <p>{snippet.note}</p>
//   </div>
// );
// return (
//   {snippetList}
// )
// }
export default Snippet

