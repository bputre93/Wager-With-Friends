import React from 'react';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';
import { ReactTabulator } from 'react-tabulator'

const wagerTable = (props)=> {


    return(
        <ReactTabulator
        columns={props.columns}
        data={props.data}
        options={props.options}
        className="wager-table"
        layout="fitColumns"
        />
    )
}

export default wagerTable;