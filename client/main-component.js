import React from 'react';
import {connect} from 'react-redux';
import NewPaula from './new-paula';

class MainComponent extends React.Component {
	render() {
		return (
			<div className="mainPageParentContainer">
	      <div className="mainPageFilter">
	      </div>
	      <div className="mainPageEntryContainer">
	        <div className="entryContainer">
	        </div>
	        <div className="entryContainer">
	        </div>
	        <div className="entryContainer">
	        </div>
	        <div className="entryContainer">
	        </div>
	        <div className="entryContainer">
	        </div>
	        <div className="entryContainer">
	        </div>
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
	//Select your state -> props mappings here
	paula: state.paula,
}))(MainComponent);
