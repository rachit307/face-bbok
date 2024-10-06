import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CreateAccount: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("2024-06-27"); // Set default date
  const [gender, setGender] = useState<string>("Female");
  const [mobile, setMobile] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign-up logic here (e.g., send data to backend)
    console.log({
      firstName,
      lastName,
      dateOfBirth,
      gender,
      mobile,
      email,
      password,
    });
  };

  return (
    <div className="container vh-100 d-flex flex-column align-items-center justify-content-start">
      {/* Centered Connecto Heading */}
      <div className="text-center mt-5">
        <h1 className="display-4">Connecto</h1>
        <p className="lead">Weaving the world together</p>
      </div>

      {/* Centered Form Card */}
      <div className="card p-5 shadow-lg mt-4" style={{ width: "400px" }}>
        <h5 className="text-center mb-4" style={{ fontWeight: 500 }}>
          Create a new account
        </h5>

        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Surname"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="dateOfBirth" className="form-label">
              Date of birth
            </label>
            <input
              type="date"
              className="form-control"
              id="dateOfBirth"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Gender</label>
            <div className="d-flex justify-content-between">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="female"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
                <label className="form-check-label" htmlFor="female">
                  Female
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="male"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="male">
                  Male
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  id="others"
                  value="Others"
                  checked={gender === "Others"}
                  onChange={(e) => setGender(e.target.value)}
                />
                <label className="form-check-label" htmlFor="others">
                  Others
                </label>
              </div>
            </div>
          </div>

          <div className="mb-3">
            <input
              type="tel"
              className="form-control"
              placeholder="Mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-success w-100">
            Sign Up
          </button>
        </form>

        <div className="mt-3 text-center">
          <a href="#" className="text-decoration-none">
            Already have an account?
          </a>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
