import "./ErrorCard.css";

export const ErrorCard = ({ message }) => {
  return (
    <div className="error-card">
      <p className="text-danger"> {message}</p>
    </div>
  );
};
