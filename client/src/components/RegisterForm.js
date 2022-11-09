const RegisterForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => (
  <form onSubmit={handleSubmit} className="mt-3">
    <div className="form-group mb-4">
      <label className="form-label">Your username</label>
      <input
        type="text"
        className="form-control"
        placeholder="Enter username"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className="form-group mb-4">
      <label className="form-label">Your email</label>
      <input
        type="email"
        className="form-control"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="form-group mb-3">
      <label className="form-label">Your password</label>
      <input
        type="password"
        className="form-control"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button
      disabled={!name || !email || !password}
      className="btn btn-primary"
      style={{
        backgroundColor: "#e24a18",
        borderColor: "#e24a18",
      }}
    >
      Submit
    </button>
  </form>
);

export default RegisterForm;
