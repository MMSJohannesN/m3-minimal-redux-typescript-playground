import './index.css';
import { createStore } from 'redux';

var body = document.getElementById('root') as HTMLBodyElement;
body.innerHTML =  `
<div>
    	<p>
    	    Counter: <span id="counterValue"></span> times
    	    <button id="increment" >+</button>
    	    <button id="decrement" >-</button>
    	</p>
        <div id="colorChange" style="background-color: green; width: 300px; height: 300px">
            Test
        </div>
</div>
`
console.log("Script started");
const initialState = {
    counter: 0,
    colorCounter: 0,
    bgColor: "pink"
}


const dynamicContent = document.getElementById("counterValue") as HTMLSpanElement;
const dynamicColor = document.getElementById("colorChange") as HTMLDivElement;
function render() {
    console.log("DOM will be updated");
    dynamicContent.innerHTML = store.getState().counter.toString();

    console.log("DOM will be updated");
    dynamicColor.innerHTML = store.getState().colorCounter.toString();
    var abc = document.getElementById("colorChange") as HTMLDivElement;
    abc.style.background = store.getState().bgColor;
}




const incrementButton = document.getElementById('increment') as HTMLButtonElement;

incrementButton.addEventListener(
    'click',
    function () {
        //the reducerFunction will be called! 
        const incrementAction = { type: 'INCREMENT' };
        store.dispatch(incrementAction);
    }
)

const decrementButton = document.getElementById('decrement') as HTMLButtonElement;
decrementButton.addEventListener(
    'click',
    function () {
        const decrementAction = { type: 'DECREMENT' };
        store.dispatch(decrementAction);
    }
)

const changeColorButton = document.getElementById('colorChange') as HTMLButtonElement;
changeColorButton.addEventListener(
    'click',
    function () {
        const changeColorAction = { type: 'CHANGE' };
        store.dispatch(changeColorAction);
    }
)



function reducerFunction(state = initialState, action: any) {
    let newState = JSON.parse(JSON.stringify(state));
    console.log("copy of state:" + JSON.stringify(state));
    switch (action.type) {
        case 'INCREMENT':
            newState.counter += 1;
            return newState;
        case 'DECREMENT':
            newState.counter -= 1;
            return newState;
        case 'CHANGE':
            var x = Math.floor(Math.random() * 256);
            var y = Math.floor(Math.random() * 256);
            var z = Math.floor(Math.random() * 256);
            newState.bgColor = "rgb(" + x + "," + y + "," + z + ")";
            newState.colorCounter += 1;
            return newState;
        default:
            return newState
    }
}

const store = createStore(reducerFunction)

render();
store.subscribe(render);

