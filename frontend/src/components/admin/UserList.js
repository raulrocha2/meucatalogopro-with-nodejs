import React, {Fragment, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTable } from 'mdbreact'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import {
    getAllUsers, 
    clearErrors,
    deleteUser
} from '../../actions/userActions'
import { DELETE_USERS_RESET  } from '../../constants/userConstants'



function UserList({ history }) {

    const alert = useAlert();
    const dispatch = useDispatch()

    const { loading, error, users } = useSelector(state => state.allUsersReducer)
    const { error: errorDelete, isDeleted } = useSelector(state => state.userAdminReducer)

    useEffect(() => {

        dispatch(getAllUsers())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        
        if (isDeleted) {
            alert.success("Usuário Deletado")
            history.push('/admin/users');
            dispatch({ type: DELETE_USERS_RESET })
        }
        
        if (errorDelete) {
            alert.error(errorDelete)
            dispatch(clearErrors())
        }
       
    }, [dispatch, alert, error, history, isDeleted, errorDelete])

    
    const deleteUserHandler = (id) => {
        
        if (window.confirm('Deseja excluir este usuário?')) {
            
            dispatch(deleteUser(id))
        }
    }
    
    const setUsers = () => {
        const data = {
            columns : [
                {
                    label: 'Numero do Usuário',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Nome',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Telefone',
                    field: 'phone',
                    sort: 'asc'
                },
                {
                    label: 'Permissão',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Ações',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        users.forEach( user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                role: user.role,
                actions: 
                    <Fragment>
                        <Link 
                            to={`/admin/user/update/${user._id}`}
                            className="btn btn-primary py-1 px-2"
                        >
                            <i className="fa fa-pencil"></i>
                        </Link>

                        <button onClick={() => deleteUserHandler(user._id)} className="btn btn-danger py-1 px-2 ml-2">
                            <i className="fa fa-trash"></i>
                        </button>
                    </Fragment>
                    
            })
        })
        return data;
    }


    return (
        <Fragment>
            <MetaData title='Usuarios'/>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <Fragment>
                        <h1 className="my-5">Usuários</h1>

                            {loading ? <Loader /> : (
                                <MDBDataTable
                                    data={setUsers()}
                                    className="px-3"
                                    bordered
                                    striped
                                    hover 
                                />
                            )}
                    </Fragment>
                </div>
            </div>
            
        </Fragment>
    )
}

export default UserList
