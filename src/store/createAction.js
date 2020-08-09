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
      if (typeof(createHandle) === "function") {
          action.payload = createHandle(arg)
      }

      if (typeof(metaHandle) === "function" && arg.resolved && arg.rejected) {
          action.meta = metaHandle(arg)
      }
      return action
  }
}
