import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sha1 } from "crypto-hash";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useAuth } from "../helper/AuthContext";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { login } = useAuth();

  async function handleSubmit() {
    setLoading(true);
    try {
      //const hashPassword = await sha1(password);
      const hashPassword = password;
      fetch("http://localhost:5000/api/auth", {
        method: "POST",
        body: JSON.stringify({
          id: id,
          password: hashPassword,
        }),
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success === true) {
            // Successful log in
            console.log("Good login");
            login(id);
            nav("/");
          } else {
            // Unsucessful log in
            console.log("Bad login");
            console.log(data);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (e) {
      console.log(e);
      alert(e);
    }
  }

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0 d-flex align-items-center">
          <MDBCol md="4">
            <MDBCardImage
              src="https://mdbootstrap.com/img/new/ecommerce/vertical/004.jpg"
              alt="phone"
              className="rounded-t-5 rounded-tr-lg-0"
              fluid
            />
          </MDBCol>

          <MDBCol md="8">
            <MDBCardBody>
              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="form1"
                type="email"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="form2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="d-flex justify-content-between mx-4 mb-4">
                <MDBCheckbox
                  name="flexCheck"
                  value=""
                  id="flexCheckDefault"
                  label="Remember me"
                />
                <a href="!#">Forgot password?</a>
              </div>

              <MDBBtn
                className="mb-4 w-100"
                onClick={handleSubmit}
                active={!loading}
              >
                Sign in
              </MDBBtn>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default Login;
