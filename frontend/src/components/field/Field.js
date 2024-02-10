

const Field = ({ field, handleChange }) => {

    const inputText = (field, handleChange) => {
        return (
            <input
                type='text'
                id={field.Nome}
                className="form-control"
                value={field.Resposta || ''}
                onChange={(event) => handleChange(event, field.Id)}
            />
        )
    }
    const inputSelect = (field, handleChange) => {
        return (
            <>
                <select className="form-control" onChange={(event) => handleChange(event, field.Id)}>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
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

