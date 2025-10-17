import React from 'react';
//styles
import "./AppBody.css";
import AddTransactions from '../AddTransactions/AddTransactions';
import Transactions from '../Transactions/Transactions';
import TopExpenses from '../TopExpenses/TopExpenses';

//components

const AppBody = () => {
    return (
        <div className='AppBody'>
            <AddTransactions />
            <Transactions />
            <TopExpenses />
        </div>
    );
};

export default AppBody;