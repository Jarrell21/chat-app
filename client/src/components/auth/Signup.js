import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();

  const toggleHideShow = () => setShow(!show);

  const postDetails = (pics) => {
    setLoading(true);
    if(pics === undefined){
      toast({
        title: 'Select an image',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      setLoading(false);
      return;
    }

    if(pics.type === 'image/jpeg' || pics.type === 'image/png'){
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'chat-app');
      data.append('cloud_name', 'dwdnyonwu');
      fetch('https://api.cloudinary.com/v1_1/dwdnyonwu/image/upload', {
        method: 'post', body: data,
      })
      .then((res) => res.json())
      .then((data) => {
        setPic(data.url.toString());
        setLoading(false);
        toast({
          title: 'Image uploaded',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
    } else {
      toast({
        title: 'JPEG or PNG files only!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      })
      setLoading(false);
      return;
    }
  };

  const submitHandler = async () => {
    setLoading(true);

    if(!name || !email || !password || !confirmpassword) {
      toast({
        title: 'Fill all the required fields!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if(password !== confirmpassword){
      toast({
        title: 'Passwords do not match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }

    if(password){
      if(password.length < 5){
        toast({
          title: 'Password should be longer than 5 characters!',
          status: 'warning',
          duration: 5000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }
    }

    try {
      const config = {
        headers: {
          "Content-type":"application/json",
        },
      };

      const { data } = await axios.post(
          '/api/user', 
          { name, email, password, pic }, 
          config
        );

      toast({
        title: 'Signed up successfully',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));

      setLoading(false);
      history.push('/chats');

    } catch (error) {
      toast({
        title: 'Sign up failed!',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter your name"
          onChange={e => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="signup-email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter your email"
          onChange={e => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="signup-password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Enter your password"
            onChange={e => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={toggleHideShow}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder="Confirm password"
            onChange={e => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={toggleHideShow}>
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <FormLabel>Upload profile picture</FormLabel>
        <InputGroup>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="green"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign up
      </Button>
    </VStack>
  );
};

export default Signup;
