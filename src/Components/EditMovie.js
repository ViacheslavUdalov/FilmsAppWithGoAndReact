import React, {Component, Fragment} from 'react';
import './editMovie.css'
import Input from "./form-components/Input";
import TextArea from "./form-components/TextArea";
import Select from "./Select";
import {withRouter} from "./helper/withRouter";
import Alert from "./ui-components/Alert";
import {Link} from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';

class EditMovie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movie: {
                id: 0,
                title: '',
                release_date: '',
                runtime: '',
                mpaa_rating: '',
                rating: '',
                description: ''
            },
            isLoading: false,
            error: null,
            mpaaOptions: [
                {id: "G", value: "G"},
                {id: "PG", value: "PG"},
                {id: "PG14", value: "PG14"},
                {id: "R", value: "R"},
                {id: "NC17", value: "NC17"}
            ],
            errors: [],
            alert: {
                type: "d-none",
                message: ""
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (evt) => {
        console.log("From was submited")
        evt.preventDefault();

        let errors = []
        if (this.state.movie.title === '') {
            errors.push('title')
        }
        this.setState({errors: errors})

        if (errors.length > 0) {
            return false
        }

        const data = new FormData(evt.target)
        console.log(data)
        const payload = Object.fromEntries(data.entries())

        const myHeaders = new Headers()
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Authorization', 'Bearer ' + this.props.jwt)
        console.log(payload)
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: myHeaders
        }

        fetch('http://localhost:4080/v1/admin/editmovie', requestOptions)
            .then(res => res.json())
            .then((data) => {
               if (data.error) {
                   this.setState({
                       alert: {
                           type: "alert-danger",
                           message: data.error.message
                       }
                   })
               } else {
                   this.setState({
                       alert: {
                           type: "alert-success",
                           message: "Changes Succeed!"
                       }
                   })
               }
            })
    }


    handleChange = (evt) => {
        let value = evt.target.value;
        let name = evt.target.name;
        this.setState((prevState) => ({
            movie: {
                ...prevState.movie,
                [name]: value
            }
        }))
    }

    hasError(key) {
        return this.state.errors.indexOf(key) !== -1;
    }

    componentDidMount() {
        if (this.props.jwt === "") {
            this.props.router.push("/login")
            return
        }

        const id = this.props.router.params.id;
        if (id > 0) {
            fetch('http://localhost:4080/v1/movie/' + id, {})
                .then((response) => {
                    if (response.status !== '200') {
                        let err = Error
                        err.message = response.status
                        this.setState({error: err})
                    }
                    return response.json()
                })
                .then((json) => {
                    let releaseDate = new Date(json.release_date)

                    this.setState({
                            movie: {
                                id: id,
                                title: json.movie.title,
                                release_date: releaseDate,
                                runtime: json.movie.runtime,
                                mpaa_rating: json.movie.mpaa_rating,
                                rating: json.movie.rating,
                                description: json.movie.description
                            },
                            isLoaded: true,
                        },
                        (error) => {
                            this.setState({
                                isLoaded: true,
                                error
                            })
                        })
                })
        } else {
            this.setState({
                isLoaded: true,
            })
        }
    }

    confirmDelete = (e) => {
        console.log('afasfsafsaf', this.state.movie.id)

        confirmAlert({
            title: 'Delete Movie?',
            message: 'Are you sure?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        fetch("http://localhost:4080/v1/admin/deletemovie/" + this.state.movie.id, {method: "DELETE"})
                            .then(res => {
                                return res.json()
                            })
                            .then((data) => {
                                if (data.error) {
                                    this.setState({
                                        alert: {type: "alert-danger", message: data.error.message}
                                    })
                                } else {
                                    this.props.router.navigate( '/admin')
                                }
                            })
                    }
                },
                {
                    label: 'No',
                    onClick: () => {}
                }
            ]
        });
    }
    render() {
        let {movie, isLoaded, error} = this.state

        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <p>Loading...</p>
        } else {
            return (
                <Fragment>
                    <h2>Add/Edit Movie</h2>
<Alert alertType={this.state.alert.type} message={this.state.alert.message} />
                    <hr/>
                    <form onSubmit={this.handleSubmit}>
                        <input type="hidden"
                               name='id'
                               id='id'
                               value={movie.id}
                               onChange={this.handleChange}
                        />

                        <Input
                            title={'Title'}
                            className={this.hasError('title') ? "is-invalid" : ''}
                            name={'title'}
                            type={'text'}
                            value={movie.title}
                            handleChange={this.handleChange}
                            errorDiv={this.hasError("title") ? "text-danger" : "d-none"}
                            errorMsg={'Please enter a title'}
                        />
                        <Input
                            title={'Release Date'}
                            name={'release_date'}
                            type={'text'}
                            value={movie.release_date}
                            handleChange={this.handleChange}
                        />
                        <Input
                            title={'Runtime'}
                            name={'runtime'}
                            type={'text'}
                            value={movie.runtime}
                            handleChange={this.handleChange}
                        />
                        <Select
                            title={'Mppa Rating'}
                            name={'mpaa_rating'}
                            options={this.state.mpaaOptions}
                            value={movie.mpaa_rating}
                            handleChange={this.handleChange}
                            placeholder={'MPaa_rating'}
                        />
                        <Input
                            title={'Rating'}
                            name={'rating'}
                            type={'text'}
                            value={movie.rating}
                            handleChange={this.handleChange}
                        />
                        <TextArea
                            title={'Description'}
                            name={'description'}
                            value={movie.description}
                            rows={'3'}
                            handleChange={this.handleChange}
                        />
                        <hr/>
                        <button className="btn btn-primary">Save</button>
                        <Link to="/admin" className="btn btn-warning ms-1">Cancel</Link>
                        {movie.id > 0 && (
                                    <a href="#"
                                       className={'btn btn-danger ms-1'}
                                       onClick={() => this.confirmDelete()}>Delete</a>
                        )}
                    </form>
                </Fragment>
            );
        }
    }
}

export default withRouter(EditMovie);