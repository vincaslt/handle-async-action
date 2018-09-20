import { showToast, ActionTypes } from "../actions";

export interface ToastsState {
  activeToasts: {
    message: string
  }[]
}

type ToastsActions = ReturnType<typeof showToast>

const initialState: ToastsState = {
  activeToasts: []
}

export default function (state: ToastsState = initialState, action: ToastsActions): ToastsState {
  switch (action.type) {
    case ActionTypes.SHOW_TOAST:
      return { activeToasts: [...state.activeToasts, { message: action.payload }] }
    default:
      return state
  }
}