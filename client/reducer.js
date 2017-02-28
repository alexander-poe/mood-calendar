//import * as actions from './actions';

const initial_state = {
	spam: 'ham',
	paula: 'brillant [sic]',
	entries: [],
};

export default function reducer(state=initial_state, action={}) {
	switch (action.type) {
		case 'SPAMIFY_SPAM':
			return {...state, spam: 'spam'};
		case 'HAMIFY_SPAM':
			return {...state, spam: 'ham'};
		case 'REPLACE_PAULA':
			return {...state, paula: action.paula};
		case 'FETCH_HELLO_SUCCESS':
			console.log("The server says:", action.message);
			return {...state, entries: action.message }
		case 'REPORT_FAILURE':
			console.error("Failure in " + action.what + ":");
			console.error(action.error);
			break;
		default: break;
	}
	return state;
}
