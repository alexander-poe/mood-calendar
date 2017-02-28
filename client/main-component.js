import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
import _ from 'lodash';
import NewPaula from './new-paula';

class MainComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(actions.fetch_hello());
  }
  render() {
    const entries =	this.props.entries ? this.props.entries : null;
    const nodes = entries !== [] ? entries.map((entry, index) => {
      console.log(entry);
      const mood = entry.mood;
      const date = entry.date;
      const text = entry.entry;
      return (
        <div className="entryContainer">
          <h2> { mood } </h2>
          <h2> { date } </h2>
          <p> { text } </p>
        </div>
      );
    })
	  : null;

    return (
      <div className="mainPageParentContainer">
        <div className="mainPageFilter" />
        <div className="mainPageEntryContainer">
          { nodes }
        </div>
        <div className="navigationContainer">
          <div className="navigationArrowsContainer">
            <i
              className="fa fa-angle-double-left left"
              aria-hidden="true"
            />
            <i className="fa fa-smile-o" aria-hidden="true" />
            <i className="fa fa-angle-double-right right" aria-hidden="true" />
          </div>
        </div>
      </div>
    );
  }
}

export default connect((state, props) => ({
  entries: state.entries,
  paula: state.paula,
}))(MainComponent);
