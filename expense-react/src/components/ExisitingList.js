import './FirstSection.css';
import axios from 'axios';
import { useEffect, useState,React } from 'react';
//import { useState, useEffect } from 'react';

function ExisitingList(props) {
    var [expenseresultList, setexpenseresultList] = useState([]);
    //var resultList = [];
    // useEffect(() => {
    //     axios.post('http://localhost:8089/getExistingList', { ExisitingListMonth: props.monthToExisitingList })
    //         .then(res => {

    //             //resultList = res.data;
    //             setresultList(res.data);
    //             console.log('result', res)
    //             console.log('resultList', resultList)
    //             console.log('resultList', resultList[0])
    //         })
    //         .catch(error => console.log(error));
    // }, [props.monthToExisitingList]);


    useEffect(() => {
        axios.post('http://localhost:8089/getExpenseList',{monthValue:props.monthToExisitingList})
            .then(res => {
                setexpenseresultList(res.data);
                console.log('resultexpense', res);
            })
            .catch(error => console.log(error));
    }, [props.monthToExisitingList]);

    return (
        <>
            <div className="">
                <h3>Existing Budgets of the month</h3>
                {/* <table>
    <tbody>
        {expenseresultList.map((item, index) => (
            <React.Fragment key={index}>
                <tr className='box'>
                    <td>{item.budgetname}</td>
                    <td>{item.budgetamount} budgeted</td>
                </tr>  
                <tr className='box-second'>
                    <td>₹{item.Totalamount} spent</td>   
                    <td>Remaining: ₹{item.remainingAmt}</td>   
                </tr>
            </React.Fragment>
        ))}
    </tbody>
</table> */}
                 <table>
                    <tbody>
                        {expenseresultList.map((item, index) => (
                            <>
                            <tr key={index+''+item} className='box'>
                                <td>{item.budgetname}</td>
                                
                                {/* key={index} */}
                                
                                <td>₹{item.Totalamount} budgeted</td>
                               
                             
                                <td>Remaining: ₹{item.remainingAmt}</td>   
                                </tr>
                                </>
                                                 
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ExisitingList;
