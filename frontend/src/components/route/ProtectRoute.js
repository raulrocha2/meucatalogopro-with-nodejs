import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ProtectRoute({ isAdmin, component: Component, ...rest }) {

    const { loading, user, isAuthenticated } = useSelector(state => state.authReducer)


    return (
        <Fragment>
            {loading === false && (
                <Route 
                    {...rest}
                    render={props => {
                        if (isAuthenticated === false) {
                            return <Redirect to='/login' />
                        }

                        if (isAdmin === true && user.role !== 'admin') {
                            return <Redirect to='/' />
                        }
                        
                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}

export default ProtectRoute
