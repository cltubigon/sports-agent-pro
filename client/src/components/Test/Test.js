import { useContext } from "react"
import useFetch from "../../hooks/useFetch"
import { AuthContext } from "../../contexts/AuthContext"

const Test = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/api/hotels")
  console.log(data)

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error occurred while fetching data</p>}
      {data && data.map((item) => <div key={item._id}><p>Name: {item.name}</p><p>Type: {item.type}</p></div>)}
    </div>
  )
}

export default Test
