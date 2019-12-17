export default (defaultState, reducer) => (state = defaultState, action) => {
  const actionHandler = reducer(state, action)[action.type];
  return actionHandler ? actionHandler() : state;
};
