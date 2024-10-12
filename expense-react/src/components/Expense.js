import axios from 'axios'; 
import { useState, useEffect } from 'react';

function Expense(props) {
  const [DropDownValue,setDropDownValue]=useState([])
  console.log("props.dropdownvalues");
  console.log(props.dropdownvalues);
  
  useEffect(()=>{
    axios.post('http://localhost:8089/expDropDown',{monthDropDown:props.monthToExpense})
    .then(res=>{
      const newDropDownValue = res.data.map((items) => items.name);
      setDropDownValue(newDropDownValue);
      console.log(newDropDownValue)})
    .catch(error=>{console.log(error)})
  },[props.dropdownvalues]) 
  const [Expensetext, setExpensetext] = useState(false);

  const [exp, setExp] = useState({
    name: '',
    amount: '',
    category: ''
  })
  const ShowExpenseText = (GetShowTextFromServer) => {
    setExpensetext(GetShowTextFromServer)
    setTimeout(() => {
      setExpensetext(false)
    }, 2000)
  }
  const expChange = (event) => {
    setExp({ ...exp, [event.target.name]: [event.target.value] });
  }
  const combinedExpense={...exp,month:props.monthToExpense};

  const HandleExpSubmit = (event) => {
    event.preventDefault();
    axios.post('http://localhost:8089/expSubmit',combinedExpense)
    .then(res=>{
      setExpensetext(true);
      ShowExpenseText(true);
      console.log(res);
    })
    .catch(error=>{console.log(error)})
  }

  return (
    <div  className="">
      <form onSubmit={HandleExpSubmit} className="ExpenseColumn">
        <h3>Add a new Expense</h3>
        <div className="ExpenseDetails">
          Expense Name <br />
          <input onChange={expChange} name='name' placeholder="e.g, Coffee"></input>
          <br />
          Amount <br />
          <input onChange={expChange} type='number' name='amount' placeholder="20"></input>
          <br />
        </div>
        Budget Category <br />
        
        {props.dropdownvalues[0]}
        <select defaultValue={props.dropdownvalues[0]} onChange={expChange} name='category'>
            {DropDownValue.map((valueInDropDown,index)=><option key={index+"+"+valueInDropDown} value={valueInDropDown}>{valueInDropDown}</option>)}  
        </select>

        <br />

        <button>Add expense</button>
         {Expensetext && <h3>Expense added</h3>}

      </form>

      {/* budgetMonth{budgetMonth} */}
     
    </div>


     


  );

}

export default Expense;
