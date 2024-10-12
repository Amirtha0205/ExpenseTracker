import './FirstSection.css';
import Budget from './Budget';
import Expense from './Expense';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ExisitingList from './ExisitingList';
import Overalltable from './overalltable';

function MonthHeader() {
    const [HeaderMonthValue, setHeaderMonthValue] = useState(1);
    //let dropValues=[];
    const [dropValues, setDropValues] = useState([]);
    const HandleMonthChange = (e) => {
        console.log("HandleMonthChange called"); // Log to check if function is called
        setHeaderMonthValue(e.target.value);
        console.log("Selected value:", e.target.value); // Log the selected value

        axios.post('http://localhost:8089/getDropDown', { HeaderMonthValue: e.target.value }) //seems axios should always send data in curly brackets as key:value
            .then(res => {
                console.log(res.data, 'storemonth'); //data from node will be stored in res
                const newDropValues = res.data.map((items) => items.name);
                setDropValues(newDropValues); //re-render executes only when there was an update to the original state. dropValues.push(items.name)-> this doesn't re-render.
                console.log(newDropValues, 'dropValues');

            })
            .catch(error => console.log(error))
            //.finally(set)
    }
    useEffect(() => {
        console.log('useeffect inside', dropValues); // This will log the updated dropValues whenever it changes
    }, [dropValues]);


    return (

        <>
            <div className="MonthCSS">
            {/* dropValues  {dropValues} */}
                Select the Month you want to manage your pocket
                <select onChange={HandleMonthChange} name='month' >
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
                {HeaderMonthValue}
                {/* {dropValues.length > 0 ? (
                    dropValues.map((value, index) => <div key={index}>{value}</div>)
                )} */}
            </div>
             <div className="BudgetColumn">
            <Budget monthToBudget={HeaderMonthValue} />
            <Expense monthToExpense={HeaderMonthValue} dropdownvalues={dropValues}/>
            </div>
            <ExisitingList monthToExisitingList={HeaderMonthValue}/>
        <Overalltable monthToOverallTable={HeaderMonthValue}/>
        </>
    );
}

export default MonthHeader;
