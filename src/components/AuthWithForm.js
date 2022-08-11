function AuthWithForm({ name, title, handleSubmit, buttonName, children }) {

    return (
        <div className={`auth auth_{${name}`}>
            {/* <div className="auth__content auth__content_form"> */}
                <h3 className="auth__title">{title}</h3>
                <form name={`auth__${name}`} className="auth__form" onSubmit={handleSubmit}>
                    {children}
                    <button type="submit" className="button__save button__save_reg">{buttonName}</button>
                </form>
            {/* </div> */}
        </div>
    )
}

export default AuthWithForm;