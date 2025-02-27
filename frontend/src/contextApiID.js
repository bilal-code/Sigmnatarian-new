import { createContext } from "react";

export const RefIdContext = createContext({
  refId: "",
  userId: "",
  refIdHandler: () => {},
  userIdHandler: () => {},
});

// export const ProviderId = () => {
//   const refIDCtx = useContext(RefIdContext);
//   return refIDCtx.refId;
// };
