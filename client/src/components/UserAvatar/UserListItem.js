import React from 'react';
import { Avatar, Box, Flex, Text } from '@chakra-ui/react';

const UserListItem = ({ user, handleFunction }) => {
  return (
    <Flex
        cursor='pointer'
        background={'#E8E8E8'}
        borderRadius='lg'
        w='100%'
        align={'center'}
        p={3}
        mb={2}
        _hover={{
            background: 'green',

        }}
        onClick={handleFunction}
    >
        <Avatar 
            name={user.name}
            src={user.pic}
            size={'sm'}
            mr={2}
            cursor='pointer'
        />
        <Box>
            <Text>{user.name}</Text>
            <Text fontSize={'xs'}>
                {user.email}
            </Text>
        </Box>
    </Flex>
  )
}

export default UserListItem