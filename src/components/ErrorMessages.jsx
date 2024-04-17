import ErrorMessageStyle from "./components-styles/ErrorMessages.module.css";

function ErrorMessages({ errorMessagesText }) {
  return (
    <div className={ErrorMessageStyle.parentErrMess}>
      <span>{errorMessagesText}</span>
    </div>
  );
}

export default ErrorMessages;
