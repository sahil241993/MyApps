import Reflux from 'reflux'
export const  Actions = Reflux.createActions(['addValue', 'secondAction']);

export class StatusStore extends Reflux.Store
{
    constructor()
    {
        super();
        this.listenables = Actions;
        this.state = {
            value: {}
        }
    }

    onAddValue(question, value)
    {
        this.setState((prevState)=>{
            const {value: prevValue = {}} = prevState;
            return {
                value: {
                    ...prevValue,
                    [question]: value,
                }
            }
        })
        // calls on Actions.firstAction();
    }

	onSecondAction()
	{
		// calls on Actions.secondAction();
	}
}