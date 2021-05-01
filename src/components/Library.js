import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Prism from "prismjs";
import './Library.css'

function Library(props) {
   
    const [snippetsResponse, setSnippetsResponse] = useState(null);

    useEffect(() => {
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${props.token}`,
          };
        axios.get('http://localhost:3001/api/user/snippets', { headers })
            .then((response) => {
            console.log(response)
                setSnippetsResponse(response.data.snippets)
            });

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
    }, [props.token]);

    console.log(snippetsResponse)
const allSnippets = () =>{
    if (!snippetsResponse || snippetsResponse === null || snippetsResponse === []) {
        return (<div>No Snippets in Library</div>)
    }
    return (
   
        <>
        {snippetsResponse.map((snippet)=> {
        return (
        <div className="" >
            <div className="box">
            <h5 className="subtitle">{snippet.title}</h5>
            <div className="card-body">
                <pre>
                <code >{snippet.snippet}</code>
                </pre>
                <p>{snippet.note}</p>
            </div>
        </div>
        </div>
        )
        }
        )}
        </> 

    )
    
}
    return (
        <div>
        {allSnippets()}
        </div>
    );
    }
export default Library;