const buttonTypes = [
  { label: "Default", className: "btn btn-active" },
  { label: "Primary", className: "btn btn-active btn-primary" },
  { label: "Secondary", className: "btn btn-active btn-secondary" },
  { label: "Accent", className: "btn btn-active btn-accent" },
  { label: "Info", className: "btn btn-active btn-info" },
  { label: "Success", className: "btn btn-active btn-success" },
  { label: "Warning", className: "btn btn-active btn-warning" },
  { label: "Error", className: "btn btn-active btn-error" },
];

const App = () => {
  return (
    <div>
      {buttonTypes.map((btn, idx) => (
        <button key={idx} className={btn.className}>
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default App;
