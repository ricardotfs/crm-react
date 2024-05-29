
import './Field.css'

const Field = ({ field, handleChange }) => {

    const inputText = (field, handleChange) => {
        
        return (
            <>
                <input
                    type='text'
                    id={field.Nome}
                    className={`form-control ${(field.IsRequired === 1 &&  field.Resposta === ''? "required-crm" :"")}`}
                    value={field.Resposta || ''}
                    onChange={(event) => handleChange(event, field.Id)}
                />
               {field.IsRequired === 1 &&  field.Resposta === ''  && <span style={{ color: '#e96666af' }}>Campo Obrigatório</span>}
            </>
        )
    }
    const inputSelect = (field, handleChange) => {
        return (
            <>
                <select className="form-control" onChange={(event) => handleChange(event, field.Id)}>
                    {field.Campos.map((option) => (
                        <option key={option.Id} value={option.Valor}>
                            {option.Valor}
                        </option>
                    ))}
                </select>
            </>
        )
    }
    return (
        <div key={field.Id}>
            <label className="form-label" htmlFor={field.Nome}>{field.Nome}</label>
            {
                field.IdTipoPropriedade === 1 ? inputText(field, handleChange) :
                    field.IdTipoPropriedade === 2 ? inputSelect(field, handleChange) :
                        inputText(field, handleChange)
            }
        </div>
    )
}

export default Field;

