import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { destroyMovie, getOneMovie } from '../../api/fetch'
import './Movie.css'

import ErrorMessage from '../errors/ErrorMessage'

function Movie() {
  const navigate = useNavigate()
  const [movie, setMovie] = useState({})
  const [loadingError, setLoadingError] = useState(false)
  const { id } = useParams()
  const handleDelete = () => {
    destroyMovie(id)
      .then(res => navigate('/movies'))
      .catch(err => {
        console.log(err)
        setLoadingError(true)
      })
  }

  useEffect(() => {
    getOneMovie(id)
      .then(res => setMovie(res))
      .catch(err => {
        setLoadingError(true)
      })
  },[id])

  return (
    <section className='movies-movie-wrapper'>
      <h2>{movie.title}</h2>
      <section className='movies-movie'>
        {loadingError ? (
          <ErrorMessage />
        ) : (
          <>
            <aside>
              <p>
                <span>Duration:</span> {movie.duration}
              </p>
              <p>
                <span>Listed Categories:</span> {movie.listedIn}
              </p>
              <p>
                <span>Country:</span> {movie.country}
              </p>
              <p>
                <span>Rating:</span> {movie.rating}
              </p>
              <p>
                <span>Date Added:</span> {movie.dateAdded}
              </p>
            </aside>
            <article>
              <p>{movie.description}</p>
            </article>
            <aside>
              <button className='delete' onClick={() => handleDelete(movie.id)}>
                Remove Movie
              </button>
              <Link to={`/movies/${id}/edit`}>
                <button>Edit</button>
              </Link>
            </aside>
          </>
        )}
      </section>
    </section>
  )
}

export default Movie
