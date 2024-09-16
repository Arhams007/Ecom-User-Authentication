import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Adminmenu from "../../components/layout/Adminmenu";
import toast from "react-hot-toast";
import axios from "axios";
import Categoryform, { EditForm } from "../../components/Form/Categoryform";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const[name,setName] =useState("")
  const [visibale,setVisibale]=useState(false)
  const [selected,setSelected]= useState(false)
const[updateName,setUpdatedName]= useState("")
//handle update
const handleUpdate = async(e)=>{
  e.preventDefault()
  try {
const {data} = await axios.put(`${import.meta.env.VITE_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updateName});
if(data?.success){
  toast.success(`${updateName} is updated`)
  setSelected(null)
  setUpdatedName("")
  setVisibale(false)
  getAllCategory()
}else{
  toast.error(data.message)
}
  } catch (error) {
    toast.error ('Something went wrong in input form')
  }
}
//handle delete
const handleDelete = async(pId)=>{

  try {
const {data} = await axios.delete(`${import.meta.env.VITE_APP_API}/api/v1/category/delete-category/${pId}`);
if(data?.success){
  toast.success(`category is Deleted`)
  getAllCategory()
}else{
  toast.error(data.message)
}
  } catch (error) {
    toast.error ('Something went wrong in input form')
  }
}

  //handle form
  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_APP_API}/api/v1/category/create-category`,{name});
      if(data?.success){
        toast.success(`${name} is created`)
        setShowForm(false)
        getAllCategory()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error ('Something went wrong in input form')
    }
  }

  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API}/api/v1/category/get-category`);
      if (data.success) {
        setCategory(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Some went wrong in getting category 😰");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);
  return (
    <Layout title={"Create Category"}>
      <div className="container flex ">
        <Adminmenu />
        <div className="ml-7">
          <div className="flex w-full justify-between items-center">
          <h1>Manage Category</h1>
          <div>
      <button
        className="bg-blue-600 rounded-lg p-2 mx-2 text-white"
        onClick={() => setShowForm(!showForm)}
      >
        Create Category
      </button>

      {showForm && (
        <Categoryform handleSubmit={handleSubmit} value={name} setValue={setName} setShowForm={setShowForm} />
      )}
    </div>
        
          </div>

          <div 
          // className="w-full h-full flex flex-wrap justify-evenly items-center"
          >
          <table class="table-auto">
          <thead>
    <tr className="flex justify-between items-center">
      <th>category name</th>
      <th>action</th>
    
    </tr>
  </thead>
  {category?.map((c) => (
    <div  key={c._id}> {/* Use a unique key for each item */}

<tbody>
    <tr className="flex justify-between items-center">
      <td><p>{c.name}</p></td>
      <td className="flex"><div>
                  <button
                    className="bg-blue-600 m-1 text-white p-2 rounded-lg"
                    onClick={() => {
                      setVisibale(true);
                      setSelected(c);
                      setUpdatedName(c.name); // Set the current name to the input for editing
                    }}
                  >
                    Edit
                  </button>

                  {visibale && selected && selected._id === c._id && (
                    <EditForm
                      value={updateName}
                      setValue={setUpdatedName}
                      handleSubmit={handleUpdate}
                      setVisibale={setVisibale}
                    />
                  )}
                </div>
                
    <button className="bg-red-600 m-1 text-white p-2 rounded-lg" onClick={()=>{handleDelete(c._id)}}>Delete</button></td>
     
    </tr>
    </tbody>
  
  
    
    </div>
  ))}
  
   </table>
</div>

        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
