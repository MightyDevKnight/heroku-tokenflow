import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useRouter } from 'next/router'
import store from "../store";
import Home from "../components/Home";
import useSWR from "swr";
import { convertToTokenArray } from "../utils/convertTokens";

const fetcher = (url) => fetch(url).then((res) => res.json());

async function fetcherFunc(...args) {
  const [url, queryData] = args;
  const res = await fetch(`${url}?id=${queryData}`);
  return res.json();
}

function App() {
  let tokens, converted;  
  const router = useRouter();
  const { data, error } = useSWR(['api/data', router.query.id], fetcherFunc);
  
  if(typeof data === 'object'){
    const res = JSON.parse(data.result);
    tokens = JSON.parse(res);
    converted = convertToTokenArray( {tokens} );
  }
  useEffect(() => {
    if(!router.isReady) return;
  }, [router.isReady]);
  return (
    <>
    {typeof data !== 'undefined' &&
      <Provider store={store}>
        <Home tokenArray={converted}/>
      </Provider>
    }
    </>
  )
};
export default App;