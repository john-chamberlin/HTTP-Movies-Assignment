import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios'

const initialState= {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const AddMovie = (props) => {
    const [movieValues, setMovieValues] = useState(initialState)
    const {push} = useHistory()

    const handleChanges = e => {
        setMovieValues({
            ...movieValues,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        const newMovie = {
            id: Date.now(),
            title: movieValues.title,
            director: movieValues.director,
            metascore: movieValues.metascore,
            stars: movieValues.stars.split(',')
        }
        axios.post('http://localhost:5000/api/movies', newMovie)
            .then(res=> {
                console.log(res)
                props.setMovieList(res.data)
                setMovieValues(initialState)
                push('/')
            })
            .catch(err=> {
                console.log(err)
            })
    }

    return(
        <div>
            <form className='add-form' onSubmit={onSubmit}>
                <input 
                    type='text'
                    name='title'
                    value={movieValues.title}
                    onChange={handleChanges}
                    placeholder='Title'
                />
                <input 
                    type='text'
                    name='director'
                    value={movieValues.director}
                    onChange={handleChanges}
                    placeholder='Director'
                />
                <input 
                    type='text'
                    name='metascore'
                    value={movieValues.metascore}
                    onChange={handleChanges}
                    placeholder='Metascore'
                />
                <input 
                    type='text'
                    name='stars'
                    value={movieValues.stars}
                    onChange={handleChanges}
                    placeholder='Stars (Seperate by comma)'
                />
                <button>Add Movie</button>
            </form>
        </div>
    )
}

export default AddMovie