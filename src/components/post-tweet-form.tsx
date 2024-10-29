import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components"
import { auth, db } from "../firebase";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const TextArea = styled.textarea`
  border: 2px solid white;
  padding: 20px;
  border-radius: 20px;
  font-size: 16px;
  color: white;
  background-color: black;
  width: 100%;
  resize: none;
  &::placeholder {
    font-size: 16px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  &:focus {
    outline: none;
    border-color: #1d9bf0;
  }
`;
const AttachFileButton = styled.label`
  padding: 10px 0px;
  color: #1d9bf0;
  text-align: center;
  border-radius: 20px;
  border: 1px solid #1d9bf0;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`;
const AttachFileInput = styled.input` // 버튼 스타일 변경이 어렵다고 함
  display:none;
`;
const SubmitBtn = styled.input`
  background-color: #1d9bf0;
  color: white;
  border: none;
  padding: 10px 0px;
  border-radius: 20px;
  font-size: 16px;
  cursor: pointer;
  &:hover,
  &:active {
    opacity: 0.9;
  }
`;

export default function PostTweetForm(){
  const [isLoading, setloading] = useState(false);
  const [tweet, setWteet] = useState("");
  const [file, setFile] = useState<File|null>(null);
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWteet(e.target.value);
  }
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files.length == 1) {
      setFile(files[0])
    }
  }

  const onSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = auth.currentUser;
    
    if(!user || isLoading || tweet === "" || tweet.length > 180) return;

    try {
      setloading(true);
      await addDoc(collection(db, "tweets"),{
        tweet,
        createdAt: Date.now(),
        username: user.displayName || "Anonymous",
        userId: user.uid,
      });
    } catch(e) {
      console.log(e);
    } finally {
      setloading(false);
    }
  }

  return <Form onSubmit={onSubmit}>
    <TextArea 
      rows={5}
      maxLength={180}
      onChange={onChange} 
      value={tweet} 
      placeholder="what is happening?"
    />
    <AttachFileButton  htmlFor="file">{ file ? "Photo added ✅" : "Add photo"}</AttachFileButton>
    <AttachFileInput onChange={onFileChange} id="file" accept="image/*" type="file" />
    <SubmitBtn type="submit" value= {isLoading ? "Posting ..." : "Post Tweet"}/>
  </Form>
}