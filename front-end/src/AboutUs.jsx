import { useState, useEffect } from 'react'
import axios from 'axios'
import './AboutUs.css'
import loadingIcon from './loading.gif'

const AboutUs = props => {
  const [about, setAbout] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_HOSTNAME}/about`)
      .then(res => {
        setAbout(res.data)
      })
      .catch(err => {
        setError(JSON.stringify(err, null, 2))
      })
  }, [])

  return (
    <>
      <h1>About Us</h1>
      {error && <p className="AboutUs-error">{error}</p>}
      {!about && !error && <img src={loadingIcon} alt="loading" />}
      {about && (
        <article className="AboutUs-article">
          <img className="AboutUs-photo" src={about.imageUrl} alt={about.name} />
          <h2>{about.name}</h2>
          {about.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </article>
      )}
    </>
  )
}

export default AboutUs
