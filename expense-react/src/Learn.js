//import {useState, useRef, useEffect} from 'react';

// function Learn() {

//     const [name,setName]=useState('');
//     const [count,setCount]=useState('');

//     useEffect(()=>{
//         console.log(name)
//         setCount(name)
       
//     },[name])

//     const handleChange=(e)=>{
//         setName(e.target.value)
//     }

//   return (
//     <div>
//      <input onChange={handleChange}/>
//      My name is{name}
//      It was {count}
//     </div>
//   );
// }

// export default Learn;

function Learn() {
    const [name, setName] = useState('');
   // const [prevName, setPrevName] = useState('');

    // useEffect(() => {
    //     // This effect runs after every render where `name` changes
    //     setPrevName(name);
    // }, [name]);

    const handleChange = (e) => {
        setName(e.target.innerText);
    };
    const ButtonClick = (e) => {
        var el=document.getElementById('SaveButton');
        el.style.display='none';
        console.log('am none to')
        //setName(e.target.innerText);
    };

    return (
        <div>
            <div  onInput={handleChange} contentEditable='true' >Amirtha</div>
            {/* <input onChange={handleChange} /> */}
            My name is {name}
            {/* It was {prevName} */}
            <button id='SaveButton' style={{display: 'block'}} onClick={ButtonClick}>Save</button>
           
        </div>
    );
}

export default Learn;
