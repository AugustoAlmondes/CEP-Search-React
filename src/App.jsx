import { FiSearch, FiMapPin, FiNavigation, FiHome, FiAlertCircle } from "react-icons/fi";
import { useState, useEffect } from "react";
import "./App.css";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  // Carrega histórico do localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("cepHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Salva histórico no localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem("cepHistory", JSON.stringify(history));
    }
  }, [history]);

  async function handleSearch() {
    if (input === "") {
      setError("Por favor, digite um CEP");
      return;
    }

    // Verifica se CEP já está no histórico
    const existingSearch = history.find(item => item.cep === input.replace(/\D/g, ''));
    if (existingSearch) {
      setCep(existingSearch);
      setInput("");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cleanedCEP = input.replace(/\D/g, '');
      const response = await api.get(`${cleanedCEP}/json/`);
      
      if (response.data.erro) {
        setError("CEP não encontrado");
        return;
      }

      setCep(response.data);
      setHistory(prev => [response.data, ...prev.slice(0, 4)]);
      setInput("");
    } catch (err) {
      setError("Erro ao buscar CEP. Verifique a conexão ou tente novamente.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  function formatCEP(cep) {
    return cep.replace(/(\d{5})(\d{3})/, "$1-$2");
  }

  return (
    <div className="app">
      <div className="search-container">
        <h1 className="title">
          <FiMapPin className="icon" /> Buscador de CEP
        </h1>
        
        <p className="subtitle">Encontre endereços em todo o Brasil</p>

        <div className="search-box">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite um CEP (apenas números)"
            maxLength={9}
          />
          <button 
            className="search-button" 
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <FiSearch size={20} />
            )}
          </button>
        </div>

        {error && (
          <div className="error-message">
            <FiAlertCircle /> {error}
          </div>
        )}

        {cep && (
          <div className="result-card">
            <h2>
              <FiNavigation /> {formatCEP(cep.cep)}
            </h2>
            <div className="address-info">
              <p><strong>Logradouro:</strong> {cep.logradouro || "Não informado"}</p>
              <p><strong>Bairro:</strong> {cep.bairro || "Não informado"}</p>
              <p><strong>Cidade/UF:</strong> {cep.localidade} - {cep.uf}</p>
              {cep.complemento && (
                <p><strong>Complemento:</strong> {cep.complemento}</p>
              )}
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="history-section">
            <h3>Histórico de buscas</h3>
            <div className="history-list">
              {history.map((item, index) => (
                <div 
                  key={index} 
                  className="history-item"
                  onClick={() => {
                    setInput(item.cep);
                    setCep(item);
                  }}
                >
                  <FiHome /> {formatCEP(item.cep)} - {item.localidade}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;