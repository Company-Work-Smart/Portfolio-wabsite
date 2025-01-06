import {useState} from "react";

const useSnackbar = () => {
  const [value, setValue] = useState<boolean>(true);
  return [value, setValue];
};

export default useSnackbar;
