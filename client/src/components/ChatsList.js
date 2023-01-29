import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Stack, Text, Tooltip, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogics';
import GroupChatModal from './misc/GroupChatModal';


const ChatsList = () => {
  const {
    selectedChat, 
    setSelectedChat, 
    user, 
    chats, 
    setChats
  } = ChatState();
  const [loggedUser, setLoggedUser] = useState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);

    } catch (error) {
      toast({
        title: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, []);

  return (
    <Box
      display={{base: selectedChat ? 'none' : 'flex', md: 'flex'}}
      flexDir='column'
      alignItems={'center'}
      p={3}
      w={{base: '100%', md: '31%'}}
      border='solid'
      borderRadius={'lg'}
    >
      <Flex
        pb={3}
        px={3}
        fontSize={{base: '28px', md: '30px'}}
        fontFamily='Work sans'
        w='100%'
        justify={'space-between'}
        align='center'
      >
        Chats
        <GroupChatModal>
          <Tooltip label='Create new Group Chat' hasArrow>
            <Button
              display={'flex'}
              fontSize={{base: '17px', md: '10px', lg: '17px'}}
              rightIcon={<AddIcon />}
            >
              <i className="fa-solid fa-user-group"></i>
            </Button>
          </Tooltip>
        </GroupChatModal>
      </Flex>

      <Box
        display={'flex'}
        flexDir='column'
        p={3}
        w={'100%'}
        h='100%'
        borderRadius={'lg'}
        overflowY='hidden'
      >
        {chats ? (
          <Stack overflowY={'scroll'}>
            {chats.map((chat) => (
              <Box
                cursor={'pointer'}
                bg={selectedChat === chat ? 'green' : '#E8E8E8'}
                color={selectedChat === chat ? 'white' : 'black'}
                px={3}
                py={2}
                borderRadius='lg'
                key={chat._id}
                onClick={() => setSelectedChat(chat)}
              >
                <Text>
                  {!chat.isGroupChat ? (
                    getSender(loggedUser, chat.users)
                  ) : (chat.chatName)}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  )
}

export default ChatsList