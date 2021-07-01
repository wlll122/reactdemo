import { Component } from 'react';

function FancyBorder(props){
    return (
        <div>
            {props.children}
        </div>
    )
}

function WelcomeDialog(){
    return (
        <FancyBorder>
            <h1>
                welcome
            </h1>
            <p>
                thank 
            </p>
        </FancyBorder>
    )
}

