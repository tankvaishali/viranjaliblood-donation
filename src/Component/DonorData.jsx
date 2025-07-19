import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function DonorData() {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    fetchDonors();
  }, []);

  const fetchDonors = async () => {
    try {
      const res = await axios.get('https://viranjalibloodbackend.onrender.com/api/donors'); // Replace with your API URL
      setDonors(res.data);
    } catch (error) {
      console.error('Error fetching donor data:', error);
    }
  };

  return (
    <div className="container my-4">
      <h3 className="text-center mb-4 text-danger">Donor List</h3>
      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="bg-danger text-white">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Age</th>
              <th>Donation Years</th>
              <th>Blood Group</th>
              <th>Preferred Time</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {donors.length > 0 ? (
              donors.map((donor, index) => (
                <tr key={donor._id || index}>
                  <td>{index + 1}</td>
                  <td>{donor.name}</td>
                  <td>{donor.phone}</td>
                  <td>{donor.dob}</td>
                  <td>{donor.age}</td>
                  <td>{donor.donationYears}</td>
                  <td>{donor.bloodGroup}</td>
                  <td>{donor.preferredTime}</td>
                  <td>{donor.address}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center text-muted">No donors found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DonorData;
