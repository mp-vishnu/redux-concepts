import React,{useState} from 'react';
import './Child.css';
function Child(){
    const [curAm,setAm]=useState(0);
    return(
        <div className="maincontainer"> 
        <p>Current Amount : {curAm}</p>
        <p>Total Bonus : {curAm}</p>
        <div className='b1'>
            <p className="subhead">
                Account Component
            </p>
            <p>Amount:$</p>
            <button className="abc">increment +</button>
            <button className="abc">decrement-</button>
            <input className="abc"/>
            <button className="abc">increment by 10+</button>
        </div>
        <div className='b2'>
            <p className="subhead">Bonus Component</p>
            <p>Total Point:$ </p>
            <button>increment +</button>
        </div>
        </div>
    );
}

export default Child;