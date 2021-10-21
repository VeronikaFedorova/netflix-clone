const Button = (props) => {

    const { 
        value,
        func
    } = props;

    return (
        <button className="btn" onClick={() => func}>
            {value}
        </button>
    );
}
 
export default Button;