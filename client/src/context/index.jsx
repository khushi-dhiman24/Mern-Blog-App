import { createContext, useState } from "react";

const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [blogList, setBlogList] = useState([]);
  const [pending, setPending] = useState(false);
   const [isEdit, setIsEdit] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        blogList,
        setBlogList,
        pending,
        setPending,
        formData,
        setFormData,
        isEdit,
        setIsEdit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
export { GlobalContext };
