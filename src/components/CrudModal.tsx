import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  Input,
  Box,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useCrud } from "../contexts/CrudContext";

export function CrudModal() {
  const {
    novoDado,
    name,
    email,
    isOpen,
    onClose,
    setName,
    setEmail,
    handleSave,
    setNovoDado,
    editDados,
  } = useCrud();

  // SALVAR DADOS NO CRUD

  useEffect(() => {
    setNovoDado({
      name,
      email,
    });
  }, [email, name]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt="250px">
          <ModalHeader>Cadastro de Clientes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Box>

            <Box>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="purple"
              mr={3}
              onClick={() => [handleSave(novoDado!)]}
            >
              SALVAR
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              CANCELAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
