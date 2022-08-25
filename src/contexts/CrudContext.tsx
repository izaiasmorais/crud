import { useDisclosure } from "@chakra-ui/react";
import produce from "immer";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

export interface DadoProps {
  name: string;
  email: string;
}

export interface EditDados {
  name: string;
  email: string;
  index: number;
}

interface CrudContextType {
  novoDado: DadoProps;
  editDados: EditDados;
  dados: DadoProps[];
  email: string;
  name: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setDados: (dados: DadoProps[]) => void;
  setNovoDado: (novoDado: DadoProps) => void;
  setEditDados: (editDados: EditDados) => void;
  handleSave: (novoDado: DadoProps) => void;
}

interface CrudContextProviderProps {
  children: ReactNode;
}

export const CrudContext = createContext({} as CrudContextType);

export function CrudContextProvider({ children }: CrudContextProviderProps) {
  const [novoDado, setNovoDado] = useState<DadoProps>({ name: "", email: "" });
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [dados, setDados] = useState<DadoProps[]>([]);
  const [editDados, setEditDados] = useState<EditDados>({} as EditDados);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    console.log(Object.keys(editDados).length);
  }, [email]);

  function handleSave(novoDado: DadoProps) {
    const dadoAlreadyExists = dados.findIndex(
      (dado) => dado.email === novoDado.email
    );

    if (email === "" || name === "") {
      toast("Digite um nome e um email!", {
        icon: "⚠️",
      });
      return;
    }

    if (Object.keys(editDados).length) {
      dados[editDados.index] = { name, email };

      toast.success("Dados do usuário alterados!");

      localStorage.setItem("cad_cliente", JSON.stringify(dados));

      setEmail("");
      setName("");
      onClose();
    }

    if (!Object.keys(editDados).length) {
      const dadosNovos = produce(dados, (draft) => {
        if (dadoAlreadyExists < 0) {
          draft.push(novoDado);

          toast.success("Usuário cadastrado!");

          setEmail("");
          setName("");
          onClose();
        } else {
          toast.error("Usuário já cadastrado!");
        }
      });

      localStorage.setItem("cad_cliente", JSON.stringify(dadosNovos));
      setDados(dadosNovos);
    }
  }

  return (
    <CrudContext.Provider
      value={{
        novoDado,
        dados,
        name,
        email,
        isOpen,
        editDados,
        setEditDados,
        onOpen,
        onClose,
        setDados,
        setEmail,
        setName,
        setNovoDado,
        handleSave,
      }}
    >
      {children}
    </CrudContext.Provider>
  );
}

export function useCrud() {
  const context = useContext(CrudContext);

  return context;
}
