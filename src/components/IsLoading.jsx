//react loading library
import ReactLoading from "react-loading"

//import styling
import "../styles/IsLoading.css"

const IsLoading = ({ type }) => {
  return (
    <div id="loading__container">
      <ReactLoading type={type} color={"#9595f4"} height={200} width={200} />
    </div>
  )
}

export default IsLoading
