import React from "react";
import Reflux from 'reflux'
import fakedata from "./Card/CardData";
import {StatusStore, Actions} from './Card/store'

const cardBody = (type, value, options = [], onChange) => {
    if (type === "text") {
        return <input value={value} onChange = {(event) => onChange(event.target.value)}/>;
    } else if (type === "mobile_number") {
        return <input key = {type} type="number" value={value} onChange = {(event) => onChange(event.target.value)}/>;
    } else if (type === "single-select multi-choice") {
        return options.map((ins, index) => {
            return (
                <span
                    key={index}
                    className="input-group"
                    style={{ "margin-left": "10px" }}
                    onChange = {(event) => onChange(event.target.value)}
                >
                    <input type="radio" name="radio" value = {index} 
                    checked = {+value === +index}
                    />
                    {ins}
                </span>
            );
        });
    } else if (type === "multi-select multi-choice") {
        const arr = value || []
        return options.map((ins, index) => {
            return (
                <span
                    key={index}
                    className="input-group"
                    style={{ "margin-left": "10px" }}
                    onChange = {(event) => 
                    onChange(arr.indexOf(event.target.value) > 0
                     ?
                      arr.splice(arr.indexOf(event.target.value),1)
                     :
                     arr.concat(event.target.value)
                    )
                    }
                >
                    <input type="checkbox"
                      value = {index}
                      checked = {arr.indexOf(index.toString()) > -1}
                    />
                    {ins}
                </span>
            );
        });
    }
    return <input key = {type} type={type} value={value} onChange = {(event) => onChange(event.target.value)}/>;
};

class Card extends React.Component {
    constructor(props) {
        super(props)
        const { value } = this.props
        this.state = {
            value
        }
    }
    onChange = (event) => {
        console.log('#########', event)
        this.setState({value: event})
    }
    render(){
    const { cardData = {}, nextClick, prevClick, errorMsg} = this.props
    const {value} = this.state;
    const { question, type, madatory, options } = cardData;
    return (
        <React.Fragment>
            <div
                className="w3-container"
                style={{
                    display: "flex",
                    "flex-direction": "column",
                    "align-items": "center",
                    "justify-content": "center",
                    height: "100vh"
                }}
            >
                <h2>Questionare</h2>
                <div className="w3-card-4" style={ window.innerWidth > 720 ? { width: "50%" } : {}}>
                    <header className="w3-container w3-light-grey">
                        <h1 style={{ "text-align": "center" }}>{question}</h1>
                    </header>

                    <div
                        className="w3-container"
                        style={{
                            "margin-top": "10px",
                            "margin-bottom": "10px",
                            "text-align": "center"
                        }}
                    >
                        {cardBody(type, value, options, this.onChange)}
                    </div>

                    <footer
                        className="w3-container w3-light-grey"
                        style={{ "padding-bottom": "10px" }}
                    >
                        <div
                            style={{
                                display: "flex",
                                "justify-content": "space-between",
                                "align-items": "center"
                            }}
                        >
                            <button onClick={() => prevClick()}>Prev</button>
                            <button onClick={() => nextClick(question,this.state.value, madatory)}>Next</button>
                        </div>
                    </footer>
                </div>
                <div>{errorMsg}</div>
            </div>
        </React.Fragment>
    );
    }
} 

function success() {
    return <div style = {
      {'display': 'flex',
     "align-items": "center",
    "justify-content": "center",
    "height": "100vh"
  }}>Congrats you have successfully completed the questionare</div>;
}
class App extends Reflux.Component {
    state = {
        index: 0,
        errorMsg: "",
    };
    constructor(props)
    {
        super(props);
        // this.state = {}; // our store will add its own state to the component's
        this.store = StatusStore; // <- just assign the store class itself
    }

    nextClick = (question, value, madatory) => {
        // if(madatory && value){
            this.setState(nextState => {
                const { index } = nextState;
                if (index < 10) {
                    return { index: index + 1, errorMsg: '' };
                }
            });
        // } else{
        //     this.setState({
        //         errorMsg: 'Please enter the above field'
        //     })
        // }
       Actions.addValue(question, value); 
    };

    prevClick = () => {
        this.setState(prevState => {
            const { index } = prevState;
            if (index > 0 && index <= 10) {
                return { index: index - 1 };
            }
        });
    };

    render() {
        const {index} = this.state
        const { question } = fakedata[index] || {}
        return index < 10
            ? <Card
                  key = {fakedata[index].question}
                  cardData = {fakedata[index]}
                  value = {this.state.value[question]}
                  nextClick = {this.nextClick}
                  prevClick = {this.prevClick}
                  errorMsg = {this.state.errorMsg}
              />
            : success();
    }
}

export default App;
