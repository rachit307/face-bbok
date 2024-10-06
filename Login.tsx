import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here, like sending data to a server
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        {/* Left side with text */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-start px-5">
          <h1 className="display-4">Connecto</h1>
          <p className="lead">Weaving the world together</p>
        </div>

        {/* Right side with login card */}
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <div className="card p-5 shadow-lg" style={{ width: "400px" }}>
            {/* "Log in to Connecto" less bold */}
            <h5 className="text-center mb-3" style={{ fontWeight: 500 }}>
              Log in to Connecto
            </h5>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label"></label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  placeholder="Email address or phone number"
                  required
                />
              </div>
              {/* Appropriate spacing between email and password */}
              <div className="mb-4">
                <label htmlFor="password" className="form-label"></label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Log in
              </button>
            </form>

            {/* Light line between login and create new account */}
            <hr className="my-4" />

            <div className="mt-2 text-center">
              <button className="btn btn-success w-100">
                Create new account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
