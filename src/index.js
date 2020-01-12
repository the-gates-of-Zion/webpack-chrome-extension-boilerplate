import _ from 'lodash';
import './style.css';
import Icon from './webpack.png';
import Data from './data.xml'
  
import * as React from "react";
import * as ReactDOM from "react-dom";

console.log(Data);
import printMe from './print.js';
printMe();
function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');
    btn.innerHTML = 'Click me !';
    btn.addEventListener("click", printMe, false);
    
    element.appendChild(btn);
    const textnode = document.createElement('p')
    textnode.innerHTML = "hello webpack"//_.join(['Hello', 'webpack'], ' ');
    // Lodash, currently included via a script, is required for this line to work
    
    textnode.classList.add('hello');
    element.appendChild(textnode)

    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    return element;
  }
  
  document.body.appendChild(component());


  ReactDOM.render(
    <div>This is render from react Dom</div>
    ,
    document.getElementById("reactapp"),
);