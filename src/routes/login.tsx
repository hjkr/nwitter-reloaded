
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import {Form, Input, Switcher, Title, Wrapper, Error, errors} from "../components/auth-component";
import GithubButton from "../components/github-btn";


export default function Login(){
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {target: {name, value}} = e;

    if (name == "email") {
      setEmail(value);
    } else if (name == "password") {
      setPassword(value);
    }
  }

  const onSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (isLoading || email === "" || password === "") return;

    try {
      setLoading(true);
      
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (e) {

      if (e instanceof FirebaseError){
        setError(errors[e.code]);
      } else {
        console.log(e)
      }
      // setError
    } finally {
      setLoading(false);
    }

  }

  return <Wrapper>
    <Title>Log into 𝕏</Title>
    <Form onSubmit={onSubmit}>
      <Input onChange={onChange} name="email" value={email} placeholder="Email" type="text" required/>
      <Input onChange={onChange} name="password" value={password} placeholder="Password" type="text" required/>
      <Input type="submit" value={isLoading?"loading...":"Log in"}/>
    </Form>
    {error !== "" ? <Error>{error}</Error>:null}
    <Switcher>
      Don't have an account? <Link to="/create-account">Create an account &rarr;</Link>
    </Switcher>
    <GithubButton/>
  </Wrapper>
}