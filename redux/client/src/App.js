import {connect} from 'react-redux'

function App({counter, onInc, onDec}) {
  return (
    <div>
      <h1>counter = {counter}</h1>
      <button onClick={onInc}>inc</button>
      <button onClick={onDec}>dec</button>
    </div>
  );
}

const mapStateToProps = (state) => state

const mapDispatchToProps = (dispatch) => {
  return {
    onInc: () => dispatch.sync({type: 'INC'}),
    onDec: () => dispatch.sync({type: 'DEC'}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
