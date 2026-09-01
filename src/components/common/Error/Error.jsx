import { Link } from 'react-router-dom';
import './Error.css'
import { X } from 'lucide-react';
export default function Error({message}) {
  return (
    <div className="error">
        <div className="x-icon">
            <X />
        </div>
        <h2>Oops!</h2>
        <p>{message}</p>
        <Link to={'/home'}><button>Go Home</button></Link>
    </div>
  )
}
