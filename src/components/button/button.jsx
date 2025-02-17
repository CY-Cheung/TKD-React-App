import './button.css';

function Button({ label, color }) {
    const buttonStyle = {
        borderColor: color,
    };    
    return (
        <button className="button" style={buttonStyle}>
            { label }
        </button>
    );
}

export default Button;
