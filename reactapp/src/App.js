import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [adresse, setAdresse] = useState('');
  const [tel, setTel] = useState('');
  const [showUsers, setShowUsers] = useState(false);

  useEffect(() => {
    getUsers();
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    const response = await axios.post('http://localhost:8080/api/users', {
      "nom":nom,
      "prenom":prenom,
      "adresse":adresse,
      "tel":tel
  });
    //console.log('Réponse du backend :', response.data);
    //console.lo("test");
    setUsers([...users, response.data]);
    setNom('');
    setPrenom('');
    setAdresse('');
    setTel('');
  }
  const getUsers = async () => {
    const response = await axios.get('http://localhost:8080/api/users');
    setUsers(response.data);
  };

  const handleShowUsers = () => {
    setShowUsers(true);
  }

  const handleDeleteUser = async (id) => {
    const response = await axios.delete(`http://localhost:8080/api/users/${id}`);
    console.log('Réponse du backend :', response.data);
    setUsers(users.filter(user => user.id !== id));
  }

  return (
    <div>
      <h1>Liste des utilisateurs</h1>
      {showUsers ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Adresse</th>
              <th>Téléphone</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nom}</td>
                <td>{user.prenom}</td>
                <td>{user.adresse}</td>
                <td>{user.tel}</td>
                <td>
        <button onClick={() => handleDeleteUser(user.id)}>Supprimer</button>
      </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <>
          <form onSubmit={handleAddUser}>
            <label>
              Nom :
              <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} />
            </label>
            <br />
            <label>
              Prénom :
              <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} />
            </label>
            <br />
            <label>
              Adresse :
              <input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
            </label>
            <br />
            <label>
              Téléphone :
              <input type="number" value={tel} onChange={(e) => setTel(e.target.value)} />
            </label>
            <br />
            <button type="submit">Ajouter un utilisateur</button>
          </form>
          <br />
          <button onClick={handleShowUsers}>Afficher la liste des utilisateurs</button>
        </>
      )}
    </div>
  );
}

export default App;

