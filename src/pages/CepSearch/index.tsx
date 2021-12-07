import './styles.css';

import ResultCard from 'components/ResultCard';
import { useState } from 'react';
import axios from 'axios';

type formData = {
  Github: string;  
}

type Address = {
  url: string;
  followers: string; 
  location: string;
  name: string;
  avatar_url: string;
}

const CepSearch = () => {

  const [address, setAddress] = useState<Address>();

  const [formData, setFormData] = useState<formData>({
    Github: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.name;
      const value = event.target.value;
      setFormData( { ...formData, [name]:value } )
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    axios.get(`https://api.github.com/users/${formData.Github}`)
    .then((response) =>  {
      setAddress(response.data);
      console.log(response.data);
    })
    .catch((error) => {
      setAddress(undefined);
      console.log(error);
    });
  }

  return (
    <div className="cep-search-container">
      <div className="container search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
          <h3>Encontre um perfil Github</h3>
            <input
              type="text"
              name="Github"
              value={formData.Github}
              className="search-input"
              placeholder="Usuário Github"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary search-button">
              Encontrar
            </button>
          </div>
        </form>
      </div>
        {address &&
          <>
           <div className="linha1">
            <div className="linha2">
            <ResultCard url={address.avatar_url} />
             <h2>Informações</h2>
              <ResultCard title="Perfil:" description={address.url} />
              <ResultCard title="Seguidores:" description={address.followers} />
              <ResultCard title="Localidade:" description={address.location} />
              <ResultCard title="Nome:" description={address.name} />
            </div>
           </div>
          </>
        }
    </div>
  );
};

export default CepSearch;
