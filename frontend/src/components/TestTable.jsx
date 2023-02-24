import { useState } from 'react'

const INITIAL_STATE = [
  { id: 1, name: 'Tommy', age: 21, hobby: 'coding' },
  { id: 2, name: 'Anna', age: 19, hobby: 'reading' },
  { id: 3, name: 'Bobby', age: 16, hobby: 'swimming' },
  { id: 4, name: 'Lauren', age: 25, hobby: 'running' }
]

const capitalize = (word) => {
  return word[0].toUpperCase() + word.slice(1)
}

function TestTable() {
  const [users, setUsers] = useState(INITIAL_STATE)

  const renderUsers = () => {
    return users.map(({ id, name, age, hobby }) => {
      return <tr key={id} >
      <td style={{ padding: '10px', border: '1px solid black' }}>{id}</td>
      <td style={{ padding: '10px', border: '1px solid black' }}>{name}</td>
      <td style={{ padding: '10px', border: '1px solid black' }}>{age}</td>
      <td style={{ padding: '10px', border: '1px solid black' }}>{hobby}</td>
    </tr>
    })
  }

  const renderHeader = () => {
    return <tr>
      {Object.keys(INITIAL_STATE[0]).map(key => <th>{capitalize(key)}</th>)}
    </tr>
  }

  const renderTable = () => {
    return (
      <table>
        {renderHeader()}
        <tbody>
          {renderUsers()}
        </tbody>
      </table>
    )
  }

  return (
    <div style={{ margin: '50px' }}>
      <h1>Users Table</h1>
      {renderTable()}
    </div>
  );
}

export default TestTable;