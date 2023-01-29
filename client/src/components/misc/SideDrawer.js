import { 
  Flex, 
  Button, 
  Input,
  Text, 
  Tooltip, 
  Menu, 
  MenuButton, 
  MenuList, 
  Avatar, 
  MenuItem, 
  MenuDivider,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useToast,
  Spinner,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import React, { useState } from 'react'
import { ChatState } from '../../context/ChatProvider';
import ProfileModal from './ProfileModal';
import { useNavigate } from 'react-router-dom';
import {useDisclosure} from '@chakra-ui/hooks'
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem'

const SideDrawer = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem('userInfo');
    navigate('/')
  }

  const toast = useToast();

  const handleSearch = async () => {
    if(!search) {
      toast({
        title: 'Field cannot be empty!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left'
      })

      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      };

      const { data  } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: 'Failed to load the search results!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      });
    }
  };

  const accessChat = async (userId) => {
    try {
      setLoading(true)

      const config = {
        headers: {
          "Content-type" : "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }

      const {data} = await axios.post('/api/chat', { userId }, config);

      if(!chats.find((chat) => chat._id === data._id)){
        setChats([data, ...chats]);
      }

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: 'Error fetching the chat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left'
      })
    }
  }

  return (
    <div>
      <Flex
        justify={'space-between'}
        align='center'
        w='100%'
        p='10px'
      >
        <Tooltip label='Search users' hasArrow placement='bottom-end'>
          <Button variant={'ghost'} onClick={onOpen}>
          <SearchIcon />
          </Button>
        </Tooltip>

        <Text fontSize={'2xl'} fontFamily='Work sans'>
            Chat App
        </Text>

        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize={'2xl'} m='1' />
            </MenuButton>
            {/* <MenuList></MenuList> */}
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar 
                size={'sm'} 
                cursor='pointer' 
                name={user.name} 
                src={user.pic} 
              />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search User</DrawerHeader>

          <DrawerBody>
            <Flex pb={2}>
              <Input 
                placeholder='Search by name or email'
                mr={2}
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
              />
              <Button 
                onClick={handleSearch}
              >
                Search
              </Button>
            </Flex>

            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner display={'flex'} ml={'auto'}/>}
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default SideDrawer