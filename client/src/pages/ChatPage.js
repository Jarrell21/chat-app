import { Flex, Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider';
import SideDrawer from '../components/misc/SideDrawer'
import ChatsList from '../components/ChatsList'
import ChatBox from '../components/ChatBox'

const ChatPage = () => {
  const { user } = ChatState();
  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display={'flex'}
        justifyContent={'space-between'}
        w='100%'
        h='90vh'
        p='10px'
      >
        {user && <ChatsList />}
        {user && <ChatBox />}
      </Box>
    </div>
  )
}

export default ChatPage;