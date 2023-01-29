import React from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    IconButton,
    Flex,
    Image,
    Text,
  } from '@chakra-ui/react'
import {useDisclosure} from '@chakra-ui/hooks'
import { ViewIcon } from '@chakra-ui/icons'

const ProfileModal = ({user, children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
        {children ? (<span onClick={onOpen}>{children}</span>) : (
            <IconButton 
                display={{base: 'flex'}}
                icon={<ViewIcon />}
                onClick={onOpen}
            />
        )} 
        <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered>
        <ModalOverlay />
        <ModalContent>

          <ModalHeader>
            <Flex
                fontFamily={'Work sans'}
                fontSize='3xl'
                justify={'center'}
            >
             Profile Information
            </Flex>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Flex gap={'20px'}>
                <Image 
                    boxSize={'150px'}
                    src={user.pic}
                    alt={user.name}
                />
                <Flex
                    direction={'column'}
                    justify='center'
                    fontFamily={'Work sans'}
                    fontSize='1.3rem'
                    fontWeight={'800'}
                >
                    <Text>
                        Name: {user.name}
                    </Text>
                    <Text>
                        Email: {user.email}
                    </Text>
                </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
          </ModalFooter>

        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal