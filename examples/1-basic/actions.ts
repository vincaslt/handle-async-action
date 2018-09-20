import { createAsyncAction, createAction } from "../../src/handle-async-action";

export enum ActionTypes {
  SHOW_TOAST = 'SHOW_TOAST',
  HIDE_TOAST = 'HIDE_TOAST'
}

// FIXME: no error on "any"
// FIXME: no optional payload creator
export const showToast = createAction(ActionTypes.SHOW_TOAST, (message: string) => message)

// TODO: async toast hide