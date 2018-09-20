import promiseMiddleware from './promise-middleware'

interface Action<Type, Payload> {
  type: Type
  payload: Payload
}

interface AsyncAction<Type, SuccessPayload, ErrorPayload = Promise<string>>
  extends Action<Type, SuccessPayload | ErrorPayload> {
  error?: boolean
  meta?: { loading: boolean }
}

interface ActionHandlers<State, SuccessPayload, ErrorPayload = string> {
  start?: () => Partial<State>
  finish?: () => Partial<State>
  success?: (payload: SuccessPayload) => Partial<State>
  error?: (payload: ErrorPayload) => Partial<State>
}

function handleAsyncAction<State, ActionType, SuccessPayload, ErrorPayload>(
  state: State,
  action: AsyncAction<ActionType, Promise<SuccessPayload>, Promise<ErrorPayload>>,
  actionHandlers: ActionHandlers<State, SuccessPayload, ErrorPayload>
): State {
  if (action.meta && action.meta.loading) {
    return actionHandlers.start ? Object.assign({}, state, actionHandlers.start()) : state
  }

  const newState = actionHandlers.finish ? Object.assign({}, state, actionHandlers.finish()) : state

  if (action.error) {
    return actionHandlers.error
      ? Object.assign({}, newState, actionHandlers.error(action.payload as any))
      : newState
  }

  return actionHandlers.success
    ? Object.assign({}, newState, actionHandlers.success(action.payload as any))
    : newState
}

type PayloadCreator<Payload, Params extends any[]> = (...params: Params) => Payload

function createAsyncAction<
  Type extends string,
  SuccessPayload,
  Params extends any[],
  ErrorPayload = Promise<string>
  >(type: Type, payloadCreator: PayloadCreator<SuccessPayload, Params>) {
  return (...params: Params): AsyncAction<Type, SuccessPayload, ErrorPayload> => ({
    type,
    payload: payloadCreator(...params)
  })
}

function createAction<Type extends string, Payload, Params extends any[]>(
  type: Type,
  payloadCreator: PayloadCreator<Payload, Params>
) {
  return (...params: Params): Action<Type, Payload> => ({
    type,
    payload: payloadCreator(...params)
  })
}

export { promiseMiddleware, createAsyncAction, createAction, handleAsyncAction }
