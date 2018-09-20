import * as React from 'react'
import { connect } from 'react-redux';
import { ReduxState } from './reducers';
import Toast from './Toast';
import { showToast } from './actions';

const buttonStyle: React.CSSProperties = {
  position: 'fixed',
  right: 16,
  bottom: 16,
  height: 50,
  width: 50,
  borderRadius: 50,
  color: 'blue',
  backgroundColor: '#aaff33',
  borderWidth: 0,
  cursor: 'pointer'
}

interface StateProps {
  activeToasts: {
    message: string
  }[]
}

interface DispatchProps {
  showToast: typeof showToast
}

type Props = StateProps & DispatchProps

const ToastManager = (props: Props) => (
  <React.Fragment>
    <div>

      {props.activeToasts.map((toast) => <Toast message={toast.message} />)}
    </div>
    <button onClick={() => props.showToast('Lalala')} style={buttonStyle}>Toast</button>
  </React.Fragment>
)

const mapState = (state: ReduxState): StateProps => ({
  activeToasts: state.toasts.activeToasts
});

const mapActions: DispatchProps = {
  showToast,
};

export default connect(mapState, mapActions)(ToastManager);