import type { NextPage } from "next";

import { Flex, Button, Box, useColorMode } from "@chakra-ui/react";
import { CrudTable } from "../components/CrudTable";
import { CrudModal } from "../components/CrudModal";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { EditDados, useCrud } from "../contexts/CrudContext";
import { useEffect } from "react";

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { onOpen, setDados, setEditDados, setEmail, setName } = useCrud();

  useEffect(() => {
    const db_costumer = localStorage.getItem("cad_cliente");

    if (db_costumer) {
      setDados(JSON.parse(db_costumer));
    }
  }, [setDados]);

  function handleOpen() {
    setEmail("");
    setName("");
    onOpen();
    setEditDados({} as EditDados);
  }

  return (
    <Flex h="100vh" align="center" justify="center" fontSize="1.25rem">
      <Box
        // bg="#e5e5e5"
        maxW={800}
        w="100%"
        h="500px"
        p="1rem"
        borderRadius=".5rem"
        overflowX="auto"
      >
        <Flex justify="space-between">
          <Button colorScheme="blue" onClick={handleOpen}>
            CADASTRAR USUÁRIO
          </Button>
          {colorMode === "light" ? (
            <Button colorScheme="blackAlpha" onClick={toggleColorMode}>
              <MoonIcon />
            </Button>
          ) : (
            <Button colorScheme="blackAlpha" onClick={toggleColorMode}>
              <SunIcon color="white" />
            </Button>
          )}
        </Flex>

        <CrudTable />
      </Box>

      <CrudModal />
    </Flex>
  );
};

export default Home;
