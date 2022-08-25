import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  useBreakpointValue,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import { useCrud } from "../contexts/CrudContext";

export function CrudTable() {
  const { dados, setDados, onOpen, setEmail, setName, setEditDados } =
    useCrud();
  const isMobile = useBreakpointValue({
    base: true,
    lg: false,
  });

  function handleRemove(email: string) {
    const dadosNovos = dados.filter((i) => i.email !== email);

    toast("Usuário deletado", {
      icon: "❌",
    });

    localStorage.setItem("cad_cliente", JSON.stringify(dadosNovos));
    setDados(dadosNovos);
  }

  function handleEdit(name: string, email: string, index: number) {
    setEditDados({ name, email, index: index });
    onOpen();
    setName(name);
    setEmail(email);
  }

  return (
    <Box overflowY="auto" w="100%">
      <Table mt="6">
        <Thead>
          <Tr>
            <Th w="200px" fontSize="1.25rem">
              Nome
            </Th>
            <Th maxW="500px" fontSize="1.25rem">
              Email
            </Th>
            <Th p={0}></Th>
            <Th p={0}></Th>
          </Tr>
        </Thead>

        <Tbody>
          {dados?.map(({ name, email }, index) => (
            <Tr
              key={index}
              cursor="pointer"
              transition="filter .1s"
              _hover={{ filter: "brightness(0.8) " }}
            >
              <Td maxW={isMobile ? 5 : 100}>{name}</Td>

              <Td maxW={isMobile ? 5 : 100}>{email}</Td>

              <Td p={0}>
                <EditIcon
                  fontSize={20}
                  onClick={() => handleEdit(name, email, index)}
                />
              </Td>

              <Td p={0}>
                <DeleteIcon fontSize={20} onClick={() => handleRemove(email)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
