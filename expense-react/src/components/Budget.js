import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import './FirstSection.css';

function Budget(props) {
  console.log('budget', props, props.monthToBudget)
  var [values, setValues] = useState({
    name: '',
    amount: ''
  })
  //const month= props.monthToBudget;
  const HandleChange = (event) => {
    setValues({ ...values, [event.target.name]: [event.target.value] })
  }
  //const [GetShowTextFromServer,setGetShowTextFromServer]=useState(false);
  const [text, setText] = useState(false);
  const combinedData = {
    ...values,
    month: props.monthToBudget
  };
  const HandleSubmit = (e) => {
    e.preventDefault();
    console.log(combinedData, '24th line');
    //setValues({month:month});
    axios.post('http://localhost:8089/', combinedData)
      .then(res => {
        setText(true);
        ShowText(true);
        console.log(res, combinedData)
      })
      .catch(error => console.log(error))
  }
  // useEffect(()=>{

  // })
  const ShowText = (GetShowTextFromServer) => {
    setText(GetShowTextFromServer)
    setTimeout(() => {
      setText(false)
    }, 2000)
  }

  return (



    <div className="">

      <form onSubmit={HandleSubmit} >
        <h3>Create Budget</h3>

        Budget Name <br />

        <input name='name' onChange={HandleChange} placeholder="e.g, Groceries"></input>
        <br />
        Amount <br />
        <input type='number' onChange={HandleChange} name='amount' placeholder="120"></input>

        <br />
        <button>Add Budget</button>
        {text && <h3>Budget added</h3>}

      </form>

    </div>

  );
}

export default Budget;
