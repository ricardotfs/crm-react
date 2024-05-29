
import './Field.css'

const Field = ({ field, handleChange }) => {
    const isRequired = 1;
    const text = 1;
    const combo = 2;

    const inputText = (field, handleChange) => {
        
        return (
            <>
                <label className={`form-label ${(field.IsRequired === isRequired &&  field.Resposta === ''? "form-label-crm" :"")}`} htmlFor={field.Nome}>{field.Nome}</label>
                <input
                    type='text'
                    id={field.Nome}
                    className={`form-control ${(field.IsRequired === isRequired &&  field.Resposta === ''? "required-crm" :"")}`}
                    value={field.Resposta || ''}
                    onChange={(event) => handleChange(event, field.Id)}
                />
               {field.IsRequired === isRequired &&  field.Resposta === ''  && <span style={{ color: '#e96666af' }}>Campo Obrigatório</span>}
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
            
            {
                field.IdTipoPropriedade === text ? 
                    inputText(field, handleChange) : 
                field.IdTipoPropriedade === combo ? 
                    inputSelect(field, handleChange) : inputText(field, handleChange)
            }
        </div>
    )
}

export default Field;

