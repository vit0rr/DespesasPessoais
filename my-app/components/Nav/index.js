export default () => {
    return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
                <div className="container">
                    <a className="navbar-brand" href="./index.html">
                        <img src="./assets/img/logo.png" width="50" height="35" alt="Orçamento pessoal" />
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="./index.html">Cadastro</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="./consulta.html">Consulta</a>
                            </li>
                        </ul>
                        

                    </div>
                </div>
            </nav>
    )
}