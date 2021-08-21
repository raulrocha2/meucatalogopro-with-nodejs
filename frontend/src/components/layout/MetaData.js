import React from 'react'
import { Helmet } from 'react-helmet'

function MetaDeta({ title }) {
    return (
        <Helmet>
            <title>{`${title} - catalgoPRO`}</title>
        </Helmet>
    )
}

export default MetaDeta
