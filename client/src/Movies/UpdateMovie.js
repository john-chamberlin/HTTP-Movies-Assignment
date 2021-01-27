import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import axios from 'axios'


const initialState= {
    director: '',
    id: '',
    metascore: '',
    stars: '',
    title: ''
}

const UpdateMovie = (props) => {
    const [movie, setMovie] = useState(initialState)
    const {id} = useParams()
    const {push} = useHistory()

    useEffect(()=> {
        axios.get(`http://localhost:5000/api/movies/${id}`)
            .then(res=> {
                console.log(res.data)
                setMovie(res.data)
            })
            .catch(err=> {
                console.log(err)
            })
    }, [])

    const handleChanges = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
                .then(res=> {
                    console.log(res.data)
                    push(`/movies/${id}`)
                })
                .catch(err=> [
                    console.log(err)
                ])
    }
    return(
        <div>
            <form className='update-form' onSubmit={onSubmit}>
                <input 
                    type='text'
                    name='title'
                    value={movie.title}
                    onChange={handleChanges}
                />
                 <input 
                    type='text'
                    name='director'
                    value={movie.director}
                    onChange={handleChanges}
                />
                 <input 
                    type='text'
                    name='metascore'
                    value={movie.metascore}
                    onChange={handleChanges}
                />
                <button>Submit Changes</button>
            </form>
        </div>
    )
}

export default UpdateMovie