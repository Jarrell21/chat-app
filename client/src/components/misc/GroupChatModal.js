import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    useToast,
    FormControl,
    Box,
    Input,
    Flex,
    Spinner
  } from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider';
import axios from 'axios';
import UserListItem from '../UserAvatar/UserListItem';
import UserBadgeItem from '../UserAvatar/UserBadgeItem';

const GroupChatModal = ({ children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState([])
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const { user, chats, setChats } = ChatState();

    const handleSearch = async (query) => {
      setSearch(query);
      if(!query) {
        return;
      }

      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        };

        const { data } = await axios.get(`/api/user?search=${search}`, config)
        setLoading(false);
        setSearchResult(data);

      } catch (error) {
        toast({
          title: 'Failed to load the search results!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        })
      }
    };

    const handleGroup = (userToAdd) => {
      if(selectedUsers.includes(userToAdd)){
        toast({
          title: 'User already added',
          status: 'warning',
          duration: 5000,
          isClosable: true,
          position: 'top',
        })
        return;
      }

      setSelectedUsers([...selectedUsers, userToAdd]);
    };

    const handleDelete = (userToRemove) => {
      setSelectedUsers(selectedUsers.filter(user => user._id !== userToRemove._id))
    };

    const handleSubmit = async () => {
      if (!groupChatName || !selectedUsers) {
        toast({
          title: "Please fill all the fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        return;
      }
  
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          '/api/chat/group',
          {
            name: groupChatName,
            users: JSON.stringify(selectedUsers.map((u) => u._id)),
          },
          config
        );
        setChats([data, ...chats]);
        onClose();
        toast({
          title: "New Group Chat Created!",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      } catch (error) {
        toast({
          title: "Failed to Create the Chat!",
          description: error.response.data,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
      }
    };

  return (
    <>
        <span onClick={onOpen}>{children}</span>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            display={'flex'}
            justifyContent='center'
            fontSize={'3xl'}
            fontFamily='Work sans'
          >
            Create Group Chat
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display={'flex'}
            flexDir='column'
            alignItems={'center'}
          >
            <FormControl>
                <Input 
                    placeholder='Group Name' mb={3}
                    onChange={(e) => setGroupChatName(e.target.value)}
                />
            </FormControl>
            <FormControl>
                <Input 
                    placeholder='Add  people' mb={1}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </FormControl>

            <Box w="100%" display="flex" flexWrap="wrap">
              {selectedUsers.map(u => (
                <UserBadgeItem 
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u)}
                />
              ))}
            </Box>

            {loading ? (<Flex><Spinner ml={'auto'}/></Flex>) : (
              searchResult?.slice(0,4).map(user => (
                <UserListItem 
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='green' mr={3} onClick={handleSubmit}>
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModal