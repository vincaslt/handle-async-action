import toasts, { ToastsState } from "./toasts";

export interface ReduxState {
  toasts: ToastsState
}

export default {
  toasts
}