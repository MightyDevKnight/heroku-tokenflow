import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { useRouter } from 'next/router'
import store from "../store";
import Home from "../components/Home";
import useSWR from "swr";
import { convertToTokenArray } from "../utils/convertTokens";

async function fetcherFunc(...args) {
  const [url, queryData] = args;
  const res = await fetch(`${url}?id=${queryData}`);
  return res.json();
}

function App() {
  let converted;  
  const router = useRouter().query;
  const [fileName, setFileName] = useState(router.id);

  const { data } = useSWR(['api/data', fileName], fetcherFunc);
  
  if(typeof data === 'object'){
    const tokens = JSON.parse(data.result.token);
    const themeData = data.result.themeData;
    console.log('themeData', themeData);
    converted = convertToTokenArray( {tokens} );
  }
  useEffect(() => {
    setFileName(router.id);
  }, [router]);
  return (
    <>
    {typeof data === 'object' &&
      <Provider store={store}>
        <Home tokenArray={converted}/>
      </Provider>
    }
    </>
  )
};
export default App;