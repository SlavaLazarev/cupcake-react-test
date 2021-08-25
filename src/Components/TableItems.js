import React from 'react';

const TableItems = ({titles, resultData, rateArr}) => {
  const one = [...rateArr.RUB_USD]
  const two = [...rateArr.RUB_EUR]
  const three = [...rateArr.EUR_USD]

  const minValueOne = one.reduce(function (prev, curr) {
    return prev.value < curr.value ? prev : curr
  })

  const minValueIdOne = minValueOne.id

  const minValueTwo = two.reduce(function (prev, curr) {
    return prev.value < curr.value ? prev : curr
  })


  const minValueIdTwo = minValueTwo.id

  const minValueThree = three.reduce(function (prev, curr) {
    return prev.value < curr.value ? prev : curr
  })

  const minValueIdThree = minValueThree.id



  return (
    <table border='1' bgcolor='#f5deb3' className='table-items'>
      <tbody>
      {titles.map((title) =>
        <th className='table-th'  title={title} key={title.id}>
          {title.title}
        </th>
        )}
      <tr className='table-tr'>
        <td className='table-td'>RUB/CUPCAKE</td>
        {resultData.rub.map((rate) =>
          <th className='table-th'  title={rate} key={rate}>
            {rate}
          </th>
        )}
      </tr>
      <tr className='table-tr'>
        <td className='table-td'>USD/CUPCAKE</td>
        {resultData.usd.map((rate) =>
          <th className='table-th' title={rate} key={rate}>
            {rate}
          </th>
        )}
      </tr>
      <tr className='table-tr'>
        <td className='table-td'>EUR/CUPCAKE</td>
        {resultData.eur.map((rate) =>
          <th className='table-th' rate={rate} key={rate}>
            {rate}
          </th>
        )}
      </tr>
      <tr className='table-tr'>
        <td className='table-td'>RUB/USD</td>
        {rateArr.RUB_USD.map((rate,id) =>
          <th
            className={"table-th " + (rate.id === minValueIdOne ? "marked" : "")}
            rate={rate}
            key={rate.id}
          >
            {rate.value}
          </th>
        )}
      </tr>
      <tr className='table-tr'>
        <td className='table-td'>RUB/EUR</td>
        {rateArr.RUB_EUR.map((rate) =>
          <th
            className={"table-th " + (rate.id === minValueIdTwo ? "marked" : "")}
            rate={rate}
            key={rate.id}>
            {rate.value}
          </th>
        )}
      </tr>
      <tr className='table-tr'>
        <td className='table-td'>EUR/USD</td>
        {rateArr.EUR_USD.map((rate) =>
          <th
            className={"table-th " + (rate.id === minValueIdThree ? "marked" : "")}
            rate={rate}
            key={rate.id}>
            {rate.value}
          </th>
        )}
      </tr>
      </tbody>
    </table>
  );
};

export default TableItems;
