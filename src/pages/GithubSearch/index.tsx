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

const GithubSearch = () => {

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
      <div className="container search-container">
        <form onSubmit={handleSubmit}>
          <div className="form-container">
          <h2>Encontre um perfil Github</h2>
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
        {address &&
                <ResultCard 
                nome={address.name}
                seguidores={address.followers}
                imgUrl={address.avatar_url} 
                perfilUrl={address.url}
                localidade={address.location}/>
        }
      </div>
  );
};

export default GithubSearch;
