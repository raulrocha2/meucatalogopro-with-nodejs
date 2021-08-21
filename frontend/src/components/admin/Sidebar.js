import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
    return (

        <div className="sidebar-wrapper">
            <nav id="sidebar">
                <ul className="list-unstyled components">
                <li>
                    <Link to="/dashboard"><i className="fa fa-tachometer-alt"></i> Dashboard</Link>
                </li>
        
                <li>
                    <a href="#productSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle"><i
                        className="fab fa-product-hunt"></i> Produtos</a>
                    <ul className="collapse list-unstyled" id="productSubmenu">
                        <li>
                        <Link to="/admin/products"><i className="fa fa-clipboard-list"></i> Todos</Link>
                        </li>
        
                        <li>
                        <Link to="/admin/product/new"><i className="fa fa-plus"></i> Novo</Link>
                        </li>
                    </ul>
                </li>

                <li>
                    <Link to="/admin/orders"><i className="fa fa-shopping-basket"></i> Pedidos</Link>
                </li>

                <li>
                    <Link to="/admin/users"><i className="fa fa-users"></i> Usuários</Link>
                </li>
                <li>
                    <Link to="/admin/reviews"><i className="fa fa-star"></i> Avaliações</Link>
                </li>
        
            </ul>
            </nav>
        </div>
    )
}

export default Sidebar
