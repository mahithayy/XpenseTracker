import { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import AppHead from "./components/AppHead/AppHead";
import AppBody from "./components/AppBody/AppBody";
import { TransactionsContext, MoneyContext } from "./Contexts/AllContexts";

function App() {
  const [money, setMoney] = useState({
    balance: 5000,
    expenses: 0,
  });
  const [transactionData, setTransactionData] = useState([]);
  const initialRender = useRef(true);

  // Load data on mount
  useEffect(() => {
    if (initialRender.current) onLoad();
    initialRender.current = false;
  }, []);

  // Save data whenever money or transactions change
  useEffect(() => {
    if (!initialRender.current) {
      localStorage.setItem(
        "allData",
        JSON.stringify({ money, transactionData })
      );
    }
  }, [money, transactionData]);

  const onLoad = () => {
    const localData = localStorage.getItem("allData");
    if (localData) {
      const { money, transactionData } = JSON.parse(localData);
      setMoney(money);
      setTransactionData(transactionData);
    } else {
      setMoney({ balance: 5000, expenses: 0 });
      setTransactionData([]);
    }
  };

  return (
    <main className="App">
      <header>
        <h1>Expense Tracker</h1>
      </header>
      <MoneyContext.Provider value={[money, setMoney]}>
        <TransactionsContext.Provider
          value={[transactionData, setTransactionData]}
        >
          <Navbar />
          <AppHead balance={money.balance} expenses={money.expenses} />
          <AppBody transactionData={transactionData} />
        </TransactionsContext.Provider>
      </MoneyContext.Provider>
    </main>
  );
}

export default App;
