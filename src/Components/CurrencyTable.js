import React, {useEffect, useState} from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import TableItems from "./TableItems";
import Loader from "./Loader";

function CurrencyTable() {
  const [loading, setLoading] = useState(true)
  const [resultData, setResultData] = useState({
    rub: [],
    usd: [],
    eur: [],
  });
  const [rateArr, setRateArr] = useState({
      RUB_USD: [],
      RUB_EUR: [],
      EUR_USD: []
  });
  const [titles] = React.useState([
    {id: 1, title: 'Pair name/market'},
    {id: 2, title: 'First'},
    {id: 3, title: 'Second'},
    {id: 4, title: 'Third'},
  ]);

  const updateDataHelper = (first, second, third) => {
    const rubArray = [first.RUB, second.RUB, third.RUB];
    const eurArray = [first.EUR, second.EUR, third.EUR];
    const usdArray = [first.USD, second.USD, third.USD];

    setResultData((prevState) => ({
      ...prevState,
      rub: rubArray,
      eur: eurArray,
      usd: usdArray,
    }));
    setRateArr((prevState) => ({
      ...prevState,
      RUB_USD: [{value: first.RUB / first.USD, id: uuidv4()}, {value: second.RUB / second.USD, id: uuidv4()}, {
        value: third.RUB / third.USD,
        id: uuidv4()
      }],
      RUB_EUR: [{value: first.RUB / first.EUR, id: uuidv4()}, {value: second.RUB / second.EUR, id: uuidv4()}, {value: third.RUB / third.EUR, id: uuidv4()}],
      EUR_USD: [{value: first.EUR / first.USD, id: uuidv4()}, {value: second.EUR / second.USD, id: uuidv4()}, {
      value: third.EUR / third.USD,
      id: uuidv4()
    }]
    }))
  };

  useEffect(() => {
    subscribe();
  }, []);

  const subscribe = async () => {
    try {
      const responseF = await axios.get('http://localhost:3010/api/v1/first/poll');
      const responseS = await axios.get('http://localhost:3010/api/v1/second/poll');
      const responseT = await axios.get('http://localhost:3010/api/v1/third/poll');


      updateDataHelper(
        responseF.data.rates,
        responseS.data.rates,
        responseT.data.rates
      );
      setLoading(false)
      await subscribe();
    } catch (e) {
      setTimeout(() => {
        subscribe();
      }, 500);
    }
    setLoading(false)
  };

  return (
    <div>
      {loading && <Loader />}

      { loading ? null : <TableItems
    resultData={resultData}
    rateArr={rateArr}
    titles={titles}
  /> }

</div>
  );
}

export default CurrencyTable;
