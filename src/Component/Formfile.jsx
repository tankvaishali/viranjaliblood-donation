import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function DonorForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    dob: "",
    age: "",
    donationYears: "",
    bloodGroup: "",
    preferredTime: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "please enter your name!";
    if (!formData.phone) newErrors.phone = "please enter your mobile no.!";
    else if (!/^[0-9]{10}$/.test(formData.phone))
      newErrors.phone = "please enter a valid 10-digit mobile number!";
    if (!formData.preferredTime)
      newErrors.preferredTime = "please select a preferred time!";
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
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "success!",
          text: "Your form has been submitted",
        });

        // Reset form
        setFormData({
          name: "",
          phone: "",
          dob: "",
          age: "",
          donationYears: "",
          bloodGroup: "",
          preferredTime: "",
          address: "",
        });
        setErrors({});
      } else {
        const message = data.message || "Something Went Wrong";

        // Check for duplicate phone number error
        if (message.includes("already registered with this mobile number")) {
          Swal.fire({
            icon: "warning",
            title: " already registered",
            text: "your mobile number already registered",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: message,
          });
        }
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Network Error",
        text: error.message,
      });
    }
  };

  return (
    <div className="container mb-5">
      <div className="bg-white p-2 p-lg-4 pt-2 rounded shadow-sm">
        <div className="d-flex justify-content-center align-items-center">
          <div className="float-animation">
            <img
              src="https://cdn.pixabay.com/photo/2017/08/21/21/24/blood-2667009_640.png"
              alt=""
              className="img-fluid"
              width={80}
            />
          </div>
          <h2 className="text-center text-danger fw-bold">BE A DONOR</h2>
        </div>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-4">
            <div className="h-100 rounded-pill bg_imagesec text-white text-center p-2 fw-bold d-flex align-items-center justify-content-center">
              <div className="py-3 py-lg-0">
                <div>૨૬ જુલાઈ ૨૦૨૫, શનિવાર</div>
                <div>સવારે ૭:૩૦ થી સાંજે ૫:૦૦ કલાક સુધી</div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-4 mt-3 mt-lg-0">
            <div className="h-100 rounded-pill bg_imagesec text-white text-center p-2 fw-bold">
              <div>સ્થળ :</div>
              <div>
                સૌરાષ્ટ્ર પટેલ ભવન વાડી, મીની બજાર, લોક સમર્પણ રક્તદાન કેન્દ્રની
                સામે, નાના વરાછા, સુરત
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="row g-0 g-lg-2 pera">
            {/* Name */}
            <div className="col-md-6">
              <label className="form-label text-dark">રક્તદાતા નું નામ *</label>
              <input
                type="text"
                name="name"
                className="form-control form-control-lg"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>

            {/* Phone */}
            <div className="col-md-6">
              <label className="form-label text-dark">મોબાઇલ નંબર *</label>
              <input
                type="tel"
                name="phone"
                className="form-control form-control-lg"
                value={formData.phone}
                onChange={handleChange}
                maxLength="10"
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone}</small>
              )}
            </div>

            {/* DOB */}
            <div className="col-md-6">
              <label className="form-label text-dark">જન્મ તારીખ</label>
              <input
                type="date"
                name="dob"
                className="form-control form-control-lg"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>

            {/* Age */}
            <div className="col-md-6 mt-0 mt-lg-3">
              <label className="form-label text-dark">ઉંમર</label>
              <input
                type="number"
                name="age"
                className="form-control form-control-lg"
                value={formData.age}
                onChange={handleChange}
              />
            </div>

            {/* Address */}
            <div className="col-md-6">
              <label className="form-label text-dark">રહેઠાણ વિસ્તાર</label>
              <input
                type="text"
                name="address"
                className="form-control form-control-lg"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            {/* Donation Years */}
            <div className="col-md-6 mt-0 mt-lg-3">
              <label className="form-label text-dark">
                છેલ્લે ક્યારે રક્તદાન કર્યું હતું?
              </label>
              <select
                className="form-select form-select-lg"
                name="donationYears"
                value={formData.donationYears}
                onChange={handleChange}
              >
                <option value="">select</option>
                {[0, 1, 2, 3, 4, 5].map((year) => (
                  <option key={year} value={year}>
                    {year} year
                  </option>
                ))}
              </select>
            </div>

            {/* Blood Group */}
            <div className="col-md-6">
              <label className="form-label text-dark">બ્લડ ગ્રુપ</label>
              <select
                className="form-select form-select-lg"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">select</option>
                {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                  (group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Preferred Time */}
            <div className="col-md-6">
              <label className="form-label text-dark">
                રક્તદાન માટે અનુકૂળ સમય *
              </label>
              <select
                className="form-select form-select-lg"
                name="preferredTime"
                value={formData.preferredTime}
                onChange={handleChange}
              >
                <option value="">select</option>
                {[
                  "8:00 AM",
                  "8:30 AM",
                  "9:00 AM",
                  "9:30 AM",
                  "10:00 AM",
                  "10:30 AM",
                  "11:00 AM",
                  "11:30 AM",
                  "12:00 PM",
                  "12:30 PM",
                  "1:00 PM",
                  "1:30 PM",
                  "2:00 PM",
                  "2:30 PM",
                  "3:00 PM",
                  "3:30 PM",
                  "4:00 PM",
                  "4:30 PM",
                  "5:00 PM",
                ].map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              {errors.preferredTime && (
                <small className="text-danger">{errors.preferredTime}</small>
              )}
            </div>

            <div className="col-12 text-center mt-4">
              <button
                type="submit"
                className="btn btn-danger px-5 fw-bold fs-5"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DonorForm;
