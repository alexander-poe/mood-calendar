import React from 'react';
import {connect} from 'react-redux';
import * as actions from './actions';
import NewPaula from './new-paula';

class MainComponent extends React.Component {
		constructor(props) {
			super(props);
		}
		componentDidMount () {
				this.props.dispatch(actions.fetch_hello());
		}
		render() {

			const entries =	this.props.entries ? this.props.entries : null;
			console.log(entries)

        return (
            <div className="mainPageParentContainer">
                <div className="mainPageFilter"></div>
                <div className="mainPageEntryContainer">
                    <div className="entryContainer"></div>
                    <div className="entryContainer"></div>
                    <div className="entryContainer"></div>
                    <div className="entryContainer"></div>
                    <div className="entryContainer"></div>
                    <div className="entryContainer"></div>
                </div>
                <div className="navigationContainer">
                    <div className="navigationArrowsContainer">
                        <i className="fa fa-angle-double-left left" aria-hidden="true"></i>
                        <i className="fa fa-smile-o" aria-hidden="true"></i>
                        <i className="fa fa-angle-double-right right" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((state, props) => ({
    entries: state.entries,
    paula: state.paula,
}))(MainComponent);
