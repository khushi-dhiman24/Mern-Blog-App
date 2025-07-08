import { useContext, useEffect } from 'react';
import { GlobalContext } from "../../context";
import axios from 'axios';
import {FaTrash, FaEdit} from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import './style.css';

export default function Home() {
  const { blogList, setBlogList, pending, setPending } = useContext(GlobalContext);
  const navigate = useNavigate();

  async function fetchListOfBlogs() {
      setPending(true);
      const response = await axios.get('http://localhost:3000/blog');
      const result = await response.data;

     if (result && result.blogList && result.blogList.length) {
      setBlogList(result.blogList);
      setPending(false);
    } else {
      setPending(false);
      setBlogList([]);
    }
  }

  async function handledeleteblog(getCurrentId) {
    const response = await axios.delete(`http://localhost:3000/blog/delete/${getCurrentId}`);
    const result = await response.data;

    if (result?.message) {
        fetchListOfBlogs();
    }
}

    function handleeditblog(getCurrentId) {
        console.log(getCurrentId)
         navigate("/add-blog", { state: { getCurrentId } });
    }
  


  useEffect(() => {
    fetchListOfBlogs();
  }, []);

  return (
    <>
 <div className= "wrapper">
      <h1>Blog List</h1>
      {pending ? (
        <h2>No Blogs Added</h2>
      ) : (
        <div className= "blogList">
          {blogList && blogList.length ? (
            blogList.map((blogItem) => (
              <div key={blogItem._id}>
                <p>{blogItem.title}</p>
                <p>{blogItem.description}</p>
                <FaEdit onClick={() => handleeditblog(blogItem)} size={30} />
                <FaTrash
                  onClick={() => handledeleteblog(blogItem._id)}
                  size={30}
                />
              </div>
            ))
          ) : (
            <h3></h3>
          )}
        </div>
      )}
    </div>
    </>
  );
}
