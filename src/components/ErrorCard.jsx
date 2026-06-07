import "./ErrorCard.css";

export const ErrorCard = ({ message }) => {
  return (
    <div className="error-card">
      <svg
        className="error-card-icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
      <p className="text-danger">{message}</p>
    </div>
  );
};
