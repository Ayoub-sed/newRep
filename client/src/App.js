import './App.css';
import {useState,useEffect} from "react";//Hook that allows you to have state variables in functional components. You pass the initial state to this function and it returns a variable with the current state value (not necessarily the initial state) and another function to update this value. directly updating
import Axios from 'axios' //library to create HTTP requests (get,post data from the external source)Api request
function App() {

    const [intern, setIntern]= useState('')
    const [university, setUniversity]= useState('')
    const [internship, setInternship]= useState('')
    const [internshipsList, setInternshipsList]= useState([])

    const [newName, setNewName]= useState('')


    useEffect(()=>{
        Axios.get('http://localhost:3001/api/get')
        .then((response)=>{
            setInternshipsList(response.data);
                })
    },[]);

    const submitIntern = () =>
    {
        Axios.post('http://localhost:3001/api/insert',{internName: intern, internUniversity: university,internInternship: internship})
        .then(()=>{
        });
        setInternshipsList([...internshipsList,{name: intern, university: university,internship: internship}]);
    }

    const deleteIntern = (id) =>{
        Axios.delete('http://localhost:3001/api/deleteIntern/'+id)
    }
    const updateIntern = (id) =>
    {
        Axios.post('http://localhost:3001/api/updateIntern',{internName: newName, id: id})
        .then(()=>{
        });
        setNewName("");
     }
    return  <div className = "App" >     
      <div className="form">
      <h1>Welcome to my intership platform </h1>   
      <h1>Gestion des stagaire </h1>
      <h3>You can add update or delete an intern </h3>
      <lable>Instructor Name </lable>
      <input type="text" name="instructor" onChange={(e)=>{setIntern(e.target.value)}}/>
      <lable>Intern Name</lable>
      <input type="text"name="intern" onChange={(e)=>{setInternship(e.target.value)}}/> 
      <lable>University </lable>
      <input type="text"name="university"  onChange={(e)=>{setUniversity(e.target.value)}}/>
      <button onClick={submitIntern}> Submit</button>

      {  internshipsList.map((val)=>{
            return <div className='card'>
                 <h4>Name : {val.name}</h4>
                  <p>University: {val.university} </p>
                   <p>InternShip:{val.internship}</p> 
                   <button onClick={()=>{deleteIntern(val.id)}}>Delete</button>
                   <input type="text" id='updateInput' name="newName" onChange={(e)=>{setNewName(e.target.value)}}></input>
                   <button onClick={()=>{updateIntern(val.id)}}>Update</button>
            </div>
        
        })
      }
      </div>
      </div> 
}

export default App;