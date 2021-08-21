import React, {Fragment, useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import { useAlert } from 'react-alert'
import {
    updateUser, 
    userDetail, 
    clearErrors
} from '../../actions/userActions'
import { UPDATE_USER_RESET } from '../../constants/userConstants'





function UpdateUser({ history, match }) {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');


    const alert = useAlert()

    const { user, error  } = useSelector(state => state.userDetailReducer)
    const { error: errorUpdate, isUpdated } = useSelector(state => state.userAdminReducer)


    const userId = match.params.id;

    const dispatch = useDispatch()

    useEffect(() => {

        if (user && user._id !== userId ) {
            dispatch(userDetail(userId))
        } else {
            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone)
            setRole(user.role);
 
           
        }

        if (errorUpdate) {
            alert.error(errorUpdate)
            dispatch(clearErrors());
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Usuário atualizado com sucesso')
            history.push('/admin/users')
            dispatch({ type: UPDATE_USER_RESET})
        }
    }, [dispatch, errorUpdate, alert, history, isUpdated, user, userId, error])


    const submitHandler = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('phone', phone);
        formData.set('role', role);

        console.log(formData);
        dispatch(updateUser(user._id, formData))
    }


    return (
        <Fragment>
            <MetaData title='Atualizar Produto' />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-5">
                            <form className="shadow-lg" onSubmit={submitHandler}>
                                <h1 className="mt-2 mb-5">Atualizar Usuário</h1>

                                <div className="form-group">
                                    <label htmlFor="name_field">Nome</label>
                                    <input
                                        type="name"
                                        id="name_field"
                                        className="form-control"
                                        name='name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email_field">E-mail</label>
                                    <input
                                        type="email"
                                        id="email_field"
                                        className="form-control"
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone_field">Telefone</label>
                                    <input
                                        type="phone"
                                        id="phone_field"
                                        className="form-control"
                                        name='phone'
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="role_field">Tipo de usuáirio</label>

                                    <select
                                        id="role_field"
                                        className="form-control"
                                        name='role'
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="user">user</option>
                                        <option value="admin">admin</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Atualizar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            
        </Fragment>
    )
}


export default UpdateUser
