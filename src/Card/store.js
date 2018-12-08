import Reflux from 'reflux'
export const  Actions = Reflux.createActions(['addValue', 'secondAction']);

export class StatusStore extends Reflux.Store
{
    constructor()
    {
        super();
        this.listenables = Actions;
        this.state = {
            value: JSON.parse(localStorage.getItem('values')) || {}
        }
    }

    onAddValue(question, value)
    {
        this.setState((prevState)=>{
            const {value: prevValue = {}} = prevState;
            const obj = {
                ...prevValue,
                [question]: value,
            }
            localStorage.setItem('values', JSON.stringify(obj));
            return {
                value: obj,
            }
        })
        // calls on Actions.firstAction();
    }

	onSecondAction()
	{
		// calls on Actions.secondAction();
	}
}