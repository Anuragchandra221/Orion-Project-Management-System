import './CSS/Dashboard.css'
import './CSS/StartProject.css'
import { get_token, upload_old_project } from '../Utils/services'
import { useNavigate } from 'react-router-dom'
import { loginContext } from '../App'
import { useContext, useEffect, useState } from 'react'

function UploadOld() {
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [std1, setStd1] = useState()
    const [std2, setStd2] = useState()
    const [std3, setStd3] = useState()
    const [std4, setStd4] = useState()
    const [year, setYear] = useState()
    const [guide, setGuide] = useState()
    const [file, setFile] = useState()
    const [err, setErr] = useState()
    const [load, setLoad] = useState(false)
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState()

    const navigate = useNavigate()
    const [user] = useContext(loginContext)

    useEffect(()=>{
        if(user&& user!=="admin"){
            navigate("/dashboard")
        }
        if(!get_token()){
          navigate('/login')
        }else{
          
        }
      }, [user])

    const create = ()=>{
        setLoad(true)
        if(file && name && description && guide&&  std1&& std2&& std3&& std4){
            const formData = new FormData()
            formData.append('file', file)
            formData.append('title',name)
            formData.append('description',description)
            formData.append('guide', guide)
            formData.append('std1', std1)
            formData.append('std2', std2)
            formData.append('std3', std3)
            formData.append('std4', std4)
            formData.append('year', year)
            upload_old_project(formData).then((results)=>{
                setSuccess("Successfully added")
                setLoad(false)
                // console.log(results.data)
            })

        }else{
            setErr("Fill all the fields")
            setLoad(false)
        }
        
    }

  return (
    <div className='addcoordinator d-flex'>
        <div className='dashmain'>
            <div className='addcoo mt-5 mx-1 mx-lg-0 ml-lg-3 mb-4'>
                <div className='d-flex justify-content-between px-3'>
                        <h3>Upload Old Project</h3>
                    
                </div>
                <div className='w-100 addcoodiv px-3 py-3 mt-3 mx-auto'>
                    {success?<p style={{color: 'green'}} >{success}</p>:<></>}
                    <div className='d-flex flex-wrap project w-100 justify-content-start  mt-4 mx-auto '>
                        <div className='mt-4 projectitem'>
                            <p className='mb-1'>Title</p>
                            <input type="text" placeholder='Title of the Project....' onChange={(e)=>{
                                setName(e.target.value)
                            }} />
                        </div>
                        <div className='mt-4 projectitem mb-2'>
                            <p className='mb-1'>Description</p>
                            <textarea rows={10} placeholder='Description on the project...' cols={5} onChange={(e)=>{
                                setDescription(e.target.value)
                            }}/>
                        </div>
                        <div>
                            <label className='mr-3'>Add Abstract</label>
                            <input type='file' onChange={(e)=>{
                                setFile(e.target.files[0])
                            }}  />
                        </div>

                    </div>
                    <div className='d-flex flex-wrap  w-100 justify-content-start  mt-4 mx-auto '>
                    <div className='mt-4 addcooitem'>
                                <p className='mb-1'>Guide</p>
                                <input type="text" placeholder='Title of the Project....' onChange={(e)=>{
                                    setGuide(e.target.value)
                                }} />                      
                            </div>

                            <div className='mt-4 addcooitem'>
                                <p className='mb-1'>Student 1</p>
                                <input type="text" placeholder='Title of the Project....' onChange={(e)=>{
                                    setStd1(e.target.value)
                                }} />                       
                            </div>

                            <div className='mt-4 addcooitem'>
                                <p className='mb-1'>Student 2</p>
                                <input type="text" placeholder='Title of the Project....' onChange={(e)=>{
                                    setStd2(e.target.value)
                                }} />                        
                            </div>

                            <div className='mt-4 addcooitem'>
                                <p className='mb-1'>Student 3</p>
                                <input type="text" placeholder='Title of the Project....' onChange={(e)=>{
                                    setStd3(e.target.value)
                                }} />                         
                            </div>

                            <div className='mt-4 addcooitem'>
                                <p className='mb-1'>Student 4</p>
                                <input type="text" placeholder='Title of the Project....' onChange={(e)=>{
                                    setStd4(e.target.value)
                                }} />                           
                            </div>

                            <div className='mt-4 addcooitem'>
                                <p className='mb-1'>Year</p>
                                <input type="number" placeholder='Year of the project' onChange={(e)=>{
                                    setYear(e.target.value)
                                }} />                           
                            </div>
                    </div>

                    

                    <div className='w-100 d-flex justify-content-end mt-3 pb-3'>
                        {err?<p className='mr-3 text-danger mb-0 mt-1'>{err}</p>:<></>}
                        <button className='mr-2 theButton py-1' style={load?{width:'14em', cursor:'not-allowed', backgroundColor: '#c0c0c0', border: 'none'}:{width:'14em', cursor:'pointer'}}  onClick={create} >Upload Project</button>
                        <button className='py-1 mr-0 mr-lg-3' style={{width:'10em', backgroundColor: '#c0c0c0', border: '2px solid #c0c0c0', borderRadius: '10px', cursor: 'pointer'}} onClick={()=> navigate(-1)}>Cancel</button>
                    </div>
                    
                    
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default UploadOld