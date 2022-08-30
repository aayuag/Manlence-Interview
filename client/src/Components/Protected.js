import {Navigate} from 'react-router-dom'

const Protected = ({children}) => {
    let token = localStorage.getItem('authorization')

    if(token === null) {
        localStorage.setItem("authorization", "")
      } else{
        token = token
      }

    // console.log(token.length)

    return (
        <>
        {
            token.length ? children : <Navigate to='/'/>
        }
        </>
    )
}


export default Protected