import React, { useEffect, useState } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
        .then(res => {
            if (!res.ok){
                throw Error('Failed to fetch the data');
            }
            return res.json();
        })
        .then(data => {
            setError(null);
            setData(data);
            setIsPending(false);
        })
        .catch(err => {
            if (err.name === 'AbortError'){
                console.log('fetch aborted')
            }
            else {
                setIsPending(false);
                setError(err.message);
            }
        })
        }, 1000);
        return () => abortCont.abort();
    }, [url]);

    return {data, isPending, Error};
}

export default useFetch;