import axios from 'axios';
import { useState, useEffect } from 'react';

function Overalltable(props) {
  //const [monthToOverall, setmonthToOverall] = useState(props.monthToOverallTable);
  var prevbudget, prevExpense;
  var prevAmount;
  const [responseExpenseList, setresponseExpenseList] = useState([]);

  useEffect(() => {
    axios.post('http://localhost:8089/overallexpense', { monthToOverall: props.monthToOverallTable })
      .then(res => {
        setresponseExpenseList(res.data);
        console.log('overall', res.data);
      })
      .catch(error => console.log(error));
  }, [props.monthToOverallTable])

  var storePrevEditIndex = '';
  var PrevindexStore = '';
  const EditClickCapture = (e, month, expensename, amountrs, index) => {
    console.log("item:", expensename.expenseName, month.month, "index", index);   // This should print the index
    if (storePrevEditIndex !== index + 'Edit') {
      var element = document.getElementById(PrevindexStore)
      if (element) {
        element.contentEditable = 'false' //make 1st div editable after clicking edit
      }
      var element2 = document.getElementById(PrevindexStore + "f")
      if (element2) {
        element2.contentEditable = 'false'  //make 2nd div editable
      }
      var elementAmount = document.getElementById(PrevindexStore + "Amount")
      if (elementAmount) {
        elementAmount.contentEditable = 'false'  //make 2nd div editable
      }
      var elementHide = document.getElementById(PrevindexStore + 'SaveButton');
      if (elementHide) {
        elementHide.style.display = "none";  //show save button after clicking edit
      }
      var elementCancelShow = document.getElementById(PrevindexStore + 'Cancel');
      if (elementCancelShow) {
        elementCancelShow.style.display = "none";
      }
    }
    var element = document.getElementById(index)
    element.contentEditable = 'true' //make 1st div editable after clicking edit
    var element2 = document.getElementById(index + "f")
    element2.contentEditable = 'true'  //make 2nd div editable
    var elementAmount = document.getElementById(index + "Amount")
    elementAmount.contentEditable = 'true'  //make 2nd div editable

    var elementHide = document.getElementById(index + 'SaveButton');
    elementHide.style.display = "block";  //show save button after clicking edit
    var elementCancelShow = document.getElementById(index + 'Cancel');
    elementCancelShow.style.display = "block";
    prevbudget = element.innerHTML;//store the data immediately as the edit button is clicked.
    prevExpense = element2.innerHTML;
    prevAmount = elementAmount.innerHTML;
    storePrevEditIndex = index + 'Edit';
    PrevindexStore = index;

    console.log(index + 'Edit');
  }

  const CancelClick = (month, index) => {
    console.log(index);
    var elemnt = document.getElementById(index)
    if (elemnt) {
      elemnt.contentEditable = 'false'; // make 1st div non-editable after clicking cancel
    }
    var element20 = document.getElementById(index + "f");
    if (element20) {
      element20.contentEditable = 'false'; // make 2nd div non-editable after clicking cancel
    }
    console.log(index, elemnt, element20);
    console.log(index, elemnt.contentEditable, element20.contentEditable);
    var ele = document.getElementById(index + 'SaveButton');
    var elementCancelShw = document.getElementById(index + 'Cancel');
    ele.style.display = "none";
    elementCancelShw.style.display = "none";
  }

  const SaveButtonClick = (month, index) => {
    console.log(prevbudget, prevExpense, prevAmount);
    var el = document.getElementById(index + 'SaveButton');
    var elementCancelShow = document.getElementById(index + 'Cancel');

    console.log(index + 'SaveButton')
    el.style.display = "none";
    elementCancelShow.style.display = "none";
    var expensenameSave = document.getElementById(index);
    var budgetnameSave = document.getElementById(index + 'f');
    var AmountSave = document.getElementById(index + "Amount");
    console.log(expensenameSave.innerHTML, budgetnameSave.innerHTML, AmountSave.innerHTML);
    console.log(prevbudget, prevExpense, prevAmount);
    if (prevbudget !== expensenameSave.innerHTML || prevExpense !== budgetnameSave.innerHTML || prevAmount !== AmountSave.innerHTML) {
      axios.post('http://localhost:8089/TabularColumnSave', { month, Newexpenses: expensenameSave.innerHTML, Newbudget: budgetnameSave.innerHTML, Newamount: AmountSave.innerHTML, prevbudget, prevExpense, prevAmount })
        .then(res => { console.log(res) })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className="">
      <h3>Recent Expenses</h3>
      <center>
        <table>
          <tbody>
            {responseExpenseList.map((item, index) => (

              <tr className='box' key={index}>
                <td>
                  <div contentEditable='false' id={index}>{item.expensename}</div>
                </td>
                <td >
                  <div contentEditable='false' id={index + "f"}>{item.budgetname}</div>
                </td>
                <td >
                  <div contentEditable='false' id={index + "Amount"}>{item.amount}</div>
                </td>
                <td key={index}>{item.dateT} </td>
                <button id={index + 'Edit'} onClick={(e) => { console.log("Button clicked"); EditClickCapture(e, { month: item.month }, { expenseName: item.expensename }, { amountrs: item.Amount }, index) }}>Edit✏️</button>
                <button id={index + 'SaveButton'} onClick={(e) => SaveButtonClick({ month: item.month }, index)} style={{ display: 'none' }} >Save</button>
                <button id={index + 'Cancel'} onClick={(e) => CancelClick({ month: item.month }, index)} style={{ display: 'none' }} >Cancel</button>

              </tr>

            ))}
          </tbody>
        </table>
      </center>
    </div>
  );
}

export default Overalltable;
