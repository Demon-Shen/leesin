export default ({dispatch}) => {
  return next => action => {
      const { meta = {}, payload, error} = action;
      const { resolved, rejected} = meta;
      error ? rejected(payload) : resolved(payload);
      next(action)
  }
}