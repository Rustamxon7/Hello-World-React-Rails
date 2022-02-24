import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const GET_GREETINGS_REQUEST = 'GET_GREETINGS_REQUEST';
const GET_GREETINGS_SUCCESS = 'GET_GREETINGS_SUCCESS';

function getGreetings() {
  console.log('getGreetingsRequest() Action!!');
  return (dispatch) => {
    dispatch({
      type: GET_GREETINGS_REQUEST,
    });
    return fetch('v1/greetings.json')
      .then((response) => response.json())
      .then((json) => dispatch(getGreetingsSuccess(json)))
      .catch((error) => console.log(error));
  };
}

function getGreetingsSuccess(json) {
  console.log('getGreetingsSuccess() Action!!');
  return {
    type: GET_GREETINGS_SUCCESS,
    json,
  };
}

class Greeting extends React.Component {
  render() {
    const { greetings } = this.props;
    const greetingsList = greetings.map((greet) => {
      return <li>{greet.name}</li>;
    });

    return (
      <React.Fragment>
        Greeting: {this.props.greeting}
        <button
          className="getGreetingsBtn"
          onClick={() => {
            this.props.getGreetings();
          }}
        >
          Get Things
        </button>
        <ul>{greetingsList}</ul>
      </React.Fragment>
    );
  }
}

const structuredSelector = createStructuredSelector({
  greetings: (state) => state.greetings,
});

const mapDispatchToProps = { getGreetings };

export default connect(structuredSelector, mapDispatchToProps)(Greeting);
