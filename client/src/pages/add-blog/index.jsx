import './style.css';
import { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { GlobalContext } from "../../context";

export default function AddBlog() {
  const { formData, setFormData,setIsEdit, isEdit } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSaveBlogToDatabase() {
    const response = isEdit
      ? await axios.put(
          `http://localhost:3000/blog/update/${location.state.getCurrentId._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:3000/blog/add", {
          title: formData.title,
          description: formData.description,
        });

    const result = await response.data;
     if (result) {
      setFormData({
        title: "",
        description: "",
      });
        navigate("/");
  }
}

    useEffect(() => {
      console.log(location)
      if(location.state){
        const { getCurrentId } = location.state;
        setIsEdit(true);
        setFormData({
        title: getCurrentId.title,
        description: getCurrentId.description,
      });
      }
    }, [location]);

  return (
    <div className="wrapper">
      <h1>{isEdit ? "Edit a Blog" : "Add a Blog"}</h1>
      <div className="formWrapper">
        <input
          name="title"
          placeholder="Enter Blog Title"
          id="title"
          type="text"
          value={formData.title}
          onChange={(e) =>
            setFormData({
              ...formData,
              title: e.target.value,
            })
          }
        />
        <textarea
          name="description"
          placeholder="Enter Blog Description"
          id="description"
          value={formData.description}
          onChange={(event) =>
            setFormData({
              ...formData,
              description: event.target.value,
            })
          }
        />
        <button onClick={handleSaveBlogToDatabase}>{
          isEdit ? "Update Blog" : "Save Blog"}</button>
      </div>
    </div>
  ); 
}
