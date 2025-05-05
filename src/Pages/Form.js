import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { postReq, updateReq, } from '../Redux/Action/action';
import './Form.css';
import Loading from '../loading/Loading';
import { toast } from 'react-toastify';

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { data } = location.state || {};
  const [loading, setLoading] = useState(false);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    city: "",
    state: "",
    pinCode: "",
    checkBox: false
  });

  const [error, setError] = useState({
    firstErr: "",
    lastErr: "",
    userErr: "",
    cityErr: "",
    stateErr: "",
    pinErr: "",
    checkErr: ""
  });

  const [cities, setCities] = useState([]);

  const stateCityMap = {
    TamilNadu: ['Chennai', 'Madurai', 'Trichy'],
    Kerala: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
    Karnataka: ['Bangalore', 'Musur', 'Hubli'],
    Telangana: ['Adilabad', 'Warangal', 'Karimnagar'],

  }
  useEffect(() => {
    setCities(stateCityMap[values.state] || [])
  }, [values.state])

  useEffect(() => {
    if (data) {
      setValues({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        city: data.city || "",
        state: data.state || "",
        pinCode: data.pinCode || "",
        userName: data.userName || "",
        checkBox: data.checkBox || false,
      })
    }
  }, [data]);

  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000)
  }, []);

  const validation = (values) => {
    let hasErr = false;
    const newErrors = {};

    if (values.firstName.length < 3) {
      newErrors.firstErr = "*First name is required and must be at least 3 characters";
      hasErr = true;
    }

    if (values.lastName.length < 3) {
      newErrors.lastErr = "*Last name is required and must be at least 3 characters";
      hasErr = true;
    }
    if (values.city.length < 3) {
      newErrors.cityErr = "*Please enter your City";
      hasErr = true;
    }
    if (!values.state) {
      newErrors.stateErr = "*State is required";
      hasErr = true;
    }
    if (!/^\d{6}$/.test(values.pinCode)) {
      newErrors.pinErr = "*Pin code must be 6 digits";
      hasErr = true;
    }
    // if (!values.checkBox) {
    //   newErrors.checkErr = "*You must agree to the terms and conditions";
    //   hasErr = true;
    // }

    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(values.userName)) {
    //   newErrors.userErr = "*Invalid email format";
    //   hasErr = true;
    // }
    if (!values.userName.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.userErr = "*Invalid email format";
      hasErr = true;
    }


    setError(newErrors);
    return hasErr;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasError = validation(values);
    if (!hasError) {

      if (data) {
        dispatch(updateReq({ ...values, id: data.id }));
        navigate('/Table');
        await new Promise((Resolve) => {
          toast.info("Updated👋 Successfully", {
            position: 'top-right',
            theme: 'dark',
            
            onClose: Resolve,
          })
        })
      } else {
        dispatch(postReq(values));
        navigate('/Table');
        await new Promise((Resolve) => {
          toast.success("Posted 👋 Successfully", {
            position: 'top-right',
            theme: 'dark',
            onClose: Resolve,
          })
        })

      }



      setValues({
        firstName: "",
        lastName: "",
        userName: "",
        city: "",
        state: "",
        pinCode: "",
        checkBox: false
      });

    }
  };

  // toast("Custom style", {
  //   className: "black-background",
  //   bodyClassName: "grow-font-size",
  //   progressClassName: "fancy-progress-bar",
  // });

  return (

    <div className=''>
      {loading ?
        (
          <Loading />) : (
          <>
            <h1 className='text-center text-white' style={{ fontFamily: "Fantasy", fontSize: "60px" }}>Form</h1>
            <div className='form-box mx-auto col-md-6 col-10'>
              <form className="needs-validation " onSubmit={handleSubmit}>
                <div className="row">
                  <div className='col-lg-6'>
                    <label htmlFor="firstName" className="form-label">First name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    {error.firstErr && <p className="error">{error.firstErr}</p>}
                  </div>
                  <div className="col-lg-6">
                    <label htmlFor="lastName" className="form-label">Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    {error.lastErr && <p className="error">{error.lastErr}</p>}
                  </div>


                  {/* <div className="col-lg-6">
                    <label htmlFor="userName" className="form-label">Email</label>
                    <div className="input-group  ">
                      <span className="input-group-text text-white  " id="userName">@</span>
                      <input
                        type="email"
                        className="form-control w-75 w-md-50 "

                        id="userName"
                        name="userName"
                        // style={{ width: "200px" }}
                        value={values.userName}
                        onChange={handleChange}
                        aria-describedby="inputGroupPrepend"
                      />
                      {error.userErr && <p className="error">{error.userErr}</p>}
                    </div>
                  </div> */}


                  <div className="col-lg-6">
                    <label htmlFor="userName" className="form-label">
                      <b>Email</b>
                    </label>
                    <div className="input-group">
                      <span className="input-group-text emailIcon" id="userName">@</span>
                      <input
                        type="email"
                        className="form-control "
                        id="userName"
                        name="userName"
                        value={values.userName}
                        onChange={handleChange}
                        aria-describedby="formGroupPrepend"
                      />
                    </div>
                    {error.userErr && <p className="text-danger mt-1">{error.userErr}</p>}
                  </div>

                  <div className="col-lg-6">
                    <label htmlFor="state" className="form-label  ">State</label>
                    <select
                      className="form-select text-white  "
                      id="state"
                      name="state"
                      value={values.state}
                      onChange={handleChange} >

                      <option value="">Select a state</option>
                      <option value="TamilNadu">TamilNadu</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Telangana">Telangana</option>
                    </select>
                    {error.stateErr && <p className="error">{error.stateErr}</p>}
                  </div>


                  <div className="col-lg-6">
                    <label htmlFor="city" className="form-label">City</label>
                    <select

                      className="form-select text-white"
                      id="city"
                      name="city"
                      value={values.city}
                      onChange={handleChange}
                    >
                      <option value='' disabled>Choose</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>{city}</option>
                      ))}
                    </select>
                    {error.cityErr && <p className="error">{error.cityErr}</p>}
                  </div>


                  <div className="col-lg-6">
                    <label htmlFor="pinCode" className="form-label">Pin</label>
                    <input
                      type="text"
                      className="form-control"
                      id="pinCode"
                      name="pinCode"
                      value={values.pinCode}
                      onChange={handleChange}
                    />
                    {error.pinErr && <p className="error">{error.pinErr}</p>}
                  </div>

                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="checkBox"
                    name="checkBox"
                    checked={values.checkBox}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="checkBox">
                    Agree to terms and conditions
                  </label>
                  {error.checkErr && <p className="error">{error.checkErr}</p>}
                </div>

                
                  <button className="submitButton  mx-auto d-block " type="submit"> Submit Form</button>
                
              </form>
            </div>
          </>
        )}
    </div>

  );
};

export default Form;
