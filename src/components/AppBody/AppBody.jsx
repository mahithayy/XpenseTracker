import React from 'react';
//styles
import "./AppBody.css";
import Transactions from '../Transactions/Transactions';
import TopExpenses from '../TopExpenses/TopExpenses';
import AddTransactions from '../AddTransactions/AddTransactions';
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