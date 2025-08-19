function Card({ title, description, children, className = '' }) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-semibold text-primary">{title}</h3>
      {description && <p className="text-gray mt-2">{description}</p>}
      {children}
    </div>
  );
}

export default Card;