import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

function DonorForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    dob: '',
    age: '',
    donationYears: '',
    bloodGroup: '',
    preferredTime: '',
    address: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'please enter your name !';
    if (!formData.phone) newErrors.phone = 'please enter your mobile no.  !';
    else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'please enter your valid mobile number!';
    if (!formData.dob) newErrors.dob = 'please enter your birthday date  !';
    if (!formData.age) newErrors.age = 'please enter your age is !';
    if (!formData.address.trim()) newErrors.address = 'please enter your address !';
    if (!formData.donationYears) newErrors.donationYears = 'please select your donation year !';
    if (!formData.bloodGroup) newErrors.bloodGroup = 'please select your blood group !';
    if (!formData.preferredTime) newErrors.preferredTime = 'please select time !';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch("https://viranjalibloodbackend.onrender.com/api/donor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'form submit successfully!',
        });

        setFormData({
          name: '',
          phone: '',
          dob: '',
          age: '',
          donationYears: '',
          bloodGroup: '',
          preferredTime: '',
          address: ''
        });
        setErrors({});
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Failed!',
          text: 'Something went wrong while sending data.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Network Error',
        text: error.message,
      });
    }
  };

  return (
    <div className="container mb-5">
      <div className="bg-white p-2 p-lg-4 pt-2 rounded shadow-sm">
        <div className='d-flex justify-content-center align-items-center'>
          <div className='float-animation'>
            <img
              src="https://cdn.pixabay.com/photo/2017/08/21/21/24/blood-2667009_640.png"
              alt=""
              className='img-fluid'
              width={80}
            />
          </div>
          <h2 className="text-center mb-4 text-danger fw-bold pt-4">BE DONOR</h2>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-0 g-lg-2 pera">
            {/* Name */}
            <div className="col-md-6">
              <label className="form-label text-dark">રક્તદાતા નું નામ *</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-lg pera"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <small className="text-danger">{errors.name}</small>}
            </div>

            {/* Phone */}
            <div className="col-md-6">
              <label className="form-label text-dark">મોબાઇલ નંબર *</label>
              <input
                type="text"
                name="phone"
                className="form-control form-control-lg pera"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
              />
              {errors.phone && <small className="text-danger">{errors.phone}</small>}
            </div>

            {/* DOB */}
            <div className="col-md-6">
              <label className="form-label text-dark">જન્મ તારીખ</label>
              <input
                type="date"
                name="dob"
                className="form-control form-control-lg pera"
                value={formData.dob}
                onChange={handleChange}
              />
              {errors.dob && <small className="text-danger">{errors.dob}</small>}
            </div>

            {/* Age */}
            <div className="col-md-6 mt-0 mt-lg-3">
              <label className="form-label text-dark">ઉંમર</label>
              <input
                type="number"
                name="age"
                className="form-control form-control-lg pera"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <small className="text-danger">{errors.age}</small>}
            </div>

            {/* Address */}
            <div className="col-md-6">
              <label className="form-label text-dark">રહેઠાણ વિસ્તાર</label>
              <input
                type="text"
                name="address"
                className="form-control form-control-lg pera"
                value={formData.address}
                onChange={handleChange}
              />
              {errors.address && <small className="text-danger">{errors.address}</small>}
            </div>

            {/* Donation Years */}
            <div className="col-md-6 mt-0 mt-lg-3">
              <label className="form-label text-dark">છેલ્લે ક્યારે રક્તદાન કર્યું હતું ? *</label>
              <select
                className="form-select form-select-lg pera"
                name="donationYears"
                value={formData.donationYears}
                onChange={handleChange}
              >
                <option value="">select</option>
                {[0, 1, 2, 3, 4, 5].map(year => (
                  <option key={year} value={year}>{year} year</option>
                ))}
              </select>
              {errors.donationYears && <small className="text-danger">{errors.donationYears}</small>}
            </div>

            {/* Blood Group */}
            <div className="col-md-6">
              <label className="form-label text-dark">બ્લડ ગ્રુપ *</label>
              <select
                className="form-select form-select-lg pera"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">select</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
              {errors.bloodGroup && <small className="text-danger">{errors.bloodGroup}</small>}
            </div>

            {/* Preferred Time */}
            <div className="col-md-6">
              <label className="form-label text-dark">રક્તદાન માટે અનુકૂળ સમય *</label>
              <select
                className="form-select form-select-lg pera"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
              >
                <option value="">select</option>
                {[
                  "8:00 AM", "8:30 AM", "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
                  "11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
                  "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
                ].map(time => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
              {errors.preferredTime && <small className="text-danger">{errors.preferredTime}</small>}
            </div>

            <div className="col-12 text-center mt-4">
              <button type="submit" className="btn btn-danger px-5 fw-bold fs-5">Submit</button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}

export default DonorForm;
