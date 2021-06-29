import React, { useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listInstances } from './graphql/queries';
import { createInstance as createInstanceMutation, deleteInstance as deleteInstanceMutation , updateInstance as updateInstanceMutation} from './graphql/mutations';

const initialFormState = { name: '', ip: '' , port: '', free: true}

function App() {
  const [instances, setInstances] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchInstances();
  }, []);

  async function fetchInstances() {
    const apiData = await API.graphql({ query: listInstances });
    setInstances(apiData.data.listInstances.items);
  }

  async function createInstance() {
    if (!formData.name || !formData.ip) return;
    await API.graphql({ query: createInstanceMutation, variables: { input: formData } });
    setInstances([ ...instances, formData ]);
    setFormData(initialFormState);
  }

  async function deleteInstance({ id }) {
    const newInstancesArray = instances.filter(instance => instance.id !== id);
    setInstances(newInstancesArray);
    await API.graphql({ query: deleteInstanceMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>My Instances App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Instance Name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'ip': e.target.value})}
        placeholder="Instance Ip"
        value={formData.ip}
      />
      <button onClick={createInstance}>Create Instance</button>
      <div style={{marginBottom: 30}}>
        {
          instances.map(instance => (
            <div key={instance.id || instance.name}>
              <h2>{instance.name}</h2>
              <p>{instance.id}</p>
              <button onClick={() => deleteInstance(instance)}>Delete instance</button>
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);