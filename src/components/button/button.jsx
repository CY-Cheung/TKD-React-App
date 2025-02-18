import './button.css';

function Button({ label, borderColor, background }) {
    const buttonStyle = {
        borderColor: borderColor,
        background: background,

    };    
    return (
        <button className="button" style={buttonStyle}>
            { label }
        </button>
    );
}

export default Button;
