import React, { useEffect, useState } from "react";

const StudentForm = () => {
    const [updateIndex, setUpdateIndex] = useState(null);
    const [data, setData] = useState([])
    const [formData, setFormData] = useState({
        fname: "",
        lname: "",
        dob: "",
        gender: "",
        phone: "",
    });

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('formData'));
        if (storedData) {
          setData(storedData);
        }
      },[]);

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(data))
    }, [data])

    const [gender, setGender] = useState('')

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setFormData({ ...formData, [name]: value });
        setGender(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        const newData = { ...formData }
        setData([...data, newData])

        if (updateIndex !== null) {
            const updateData = [...data];
            updateData[updateIndex] = { ...formData };
            setData(updateData);
            setUpdateIndex(null);
          } else {
            const newData = { ...formData };
            setData([...data, newData]);
          }
        setFormData({
            fname: '',
            lname: '',
            dob: '',
            gender: '',
            phone: '',
        })
        console.log("handleSubmit", formData)


    }

    const handleUpdate = (index) => {
      const updateData = data[index]
      setFormData(updateData)
      setUpdateIndex(index)

    }

    const handleDelect = (index) => {
        const delectData = data.filter((_, i) => i !==index)
        setData(delectData)

    }

    return (
        <div className="container">
            <div className="row">
            <h1>Student Resigration Form</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    First name -:
                    <input
                        type="text"
                        name="fname"
                        value={formData.fname}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Last name -:
                    <input
                        type="text"
                        name="lname"
                        value={formData.lname}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Date of Birth -:
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Gender -:
                    <select value={gender} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </label>

                <label >Phone No -:
                    <input type="number"
                        value={formData.phone}
                        name="phone"
                        onChange={handleChange} />
                </label>
                <br />
                <button type="submit">{updateIndex !== null ? 'Update' : 'Submit'}</button>
            </form>

            <hr />
            <h1>Save Data</h1>
            <ul>
                {
                    data.map((item , index) => (
                        <li key={index}>
                            <p>First Name: {item.fname}</p>
                            <p>Last Name: {item.lname}</p>
                            <p>Date of Birth: {item.dob}</p>
                            <p>Gender: {item.gender}</p>
                            <p>Phone: {item.phone}</p>
                            <button onClick={() => handleUpdate(index)}>Update</button>
                            <button onClick={() => handleDelect(index)}> Delect</button>

                        </li>

                    )) 
                   
                }
               
            </ul>
            </div>
            
        </div>
    );
};

export default StudentForm;