import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    return (
        <>
        {snippetsResponse.map(snippet=>
            <div className="card text-center m-3">
            <h5 className="card-header">{snippet.title}</h5>
            <div className="card-body">
                <p>{snippet.snippet}</p>
                <p>{snippet.note}</p>
            </div>
        </div>
        )}
        
</> 
    );
    }
export default Library;