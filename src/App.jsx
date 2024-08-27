import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import "./style.css";
import "./App.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSSearch() {
    if (input === "") {
      alert("Digite o CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch {
      setInput("");
      alert("Ops erro ao buscar!");
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="title">Buscador de CEP</h1>

        <div className="containerInput">
          <input
            type="text"
            value={input}
            name="cepInput"
            id="cepInput"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Digite seu CEP"
          />

          <button className="buttonSearch" onClick={handleSSearch}>
            <FiSearch size={25} color="white" />
          </button>
        </div>

        {Object.keys(cep).length > 0 && (
          <main className="main">
            <h2>CEP: {cep.cep} </h2>

            <span>{cep.logradouro} </span>
            <span>Complemento: {cep.complemento} </span>
            <span>{cep.bairro} </span>
            <span>
              {cep.localidade} - {cep.uf}{" "}
            </span>
          </main>
        )}
      </div>
    </>
  );
}

export default App;
