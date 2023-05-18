import './style.css'
import TitleBody from '../TableBody'

function TableTitle({ registrousuario, setRegistroUsuario }) {

    return (
        <>
            <table className='table-title'>
                <thead>
                    <tr>
                        <th >Data</th>
                        <th >Dia da semana</th>
                        <th >Descrição</th>
                        <th >Categoria</th>
                        <th >Valor</th>
                        <th></th>
                    </tr>
                </thead>
            </table>
            {registrousuario.map((dado) => (
                <TitleBody
                    key={dado.id}
                    registro={dado}
                    registrousuario={registrousuario}
                    setRegistroUsuario={setRegistroUsuario}
                />
            ))}

        </>
    )
}

export default TableTitle