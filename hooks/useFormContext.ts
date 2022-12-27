import { useContext } from "react";

import FormContext from "@main/contexts/formContext";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const useFormContext = () => useContext(FormContext);

export default useFormContext;
