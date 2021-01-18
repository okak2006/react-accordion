import React, {useState, useEffect} from 'react'
import axios from 'axios';

export default function Search() {

    const [term, setTerm] = useState('programming');
    const [debouncedTerm, setDebouncedTerm] = useState(term);
    const [results, setResults] = useState([]);

    useEffect(()=>{
        const timerId = setTimeout(()=>{
            setDebouncedTerm(term)
        }, 1000);
        return () => {
            clearTimeout(timerId)
        }
    }, [term])

    //tell when you want to execute: initial only, on update, etc
    //[] = run at initial render
    //nothing = run at initial render AND on every rerender
    //[data] = when state data changes
    //use effect must not return anything but a function - be careful for async operations: create helper async function inside

    useEffect(()=>{
        const searchArticles = async() => {
            const {data} = await axios.get('https://en.wikipedia.org/w/api.php',{
                params: {
                    action: 'query',
                    list: 'search',
                    origin: '*',
                    format: 'json',
                    srsearch: debouncedTerm
                }
            });
            setResults(data.query.search);
        };
        searchArticles();
        /* less advanced approach
        //handle initial load
        //if we don't add results.length in useEffect array, we get "missing dependency" warning because no call is made yet on initial render
        //if we include it, we can get rid of warning but we end up making two calls: once on render and one more time when we get back results

        useEffect(()=>{
            if (term && !results.length){
                searchArticles()
            } else {
            //setTimeout has id, we can use clearTiemout to stop particular timeouts
            const timeoutId = setTimeout(()=>{
                if(term){
                    searchArticles();
                }
            }, 500)
            const searchArticles = async() => {
                const {data} = await axios.get('https://en.wikipedia.org/w/api.php',{
                    params: {
                        action: 'query',
                        list: 'search',
                        origin: '*',
                        format: 'json',
                        srsearch: debouncedTerm
                    }
                });
                setResults(data.query.search);
            };

            //initial component render -> function provided to useEffect called
            //->return a cleanup
            //rerender ->invoke a cleanup function -> func provided to useEffect called -> return a cleanup

            return()=>{
                clearTimeout(timeoutId)
            }

        }, [term])
        */
    }, [debouncedTerm])
    
    const renderedResults = results.map((result)=>{
        return (
            <div className="item" key={result.pageid}>
                <div className="right floated content">
                    <a 
                        className="ui button"
                        href={`https://en.wikipedia.org?curid=${result.pageid}`}
                    >
                        Go
                    </a>
                </div>
                <div className="content">
                    <div className="header">
                        {result.title}
                    </div>
                    {/* result.snippet is a string of HTML */}
                    <span dangerouslySetInnerHTML={{__html: result.snippet}}></span>
                </div>
            </div>
        )
    })

    return (
        <div>
            <div className="ui form">
                <div className="field">
                    <label>Enter Search Term</label>
                    <input
                        value={term}
                        onChange={e=>setTerm(e.target.value)} 
                        className="input" 
                    />
                </div>
            </div>
            <div className="ui celled list">
                {renderedResults}
            </div>
        </div>
    )
}
