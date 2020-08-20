export default function createAction(type, createHandle, metaHandle) {
  let action = {
      type,
      payload: {},
      meta:  {
          resolved:() => {},
          rejected:() => {}
      }
  }
  return (arg) =>{
      let resolved = arg && arg.resolved
      let rejected = arg && arg.rejected
      if (typeof(createHandle) === "function") {
        if (arg) {
          delete arg.resolved
          delete arg.rejected
        }
        action.payload = createHandle(arg)
      }
      if (typeof(metaHandle) === "function" && resolved && rejected) {
        action.meta = metaHandle({
            resolved,
            rejected
        })
      }
      return action
  }
}
