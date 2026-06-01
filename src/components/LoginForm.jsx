function LoginForm({
  username,
  setUsername,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  handleLogin,
}) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
      className="flex flex-col gap-2 mb-6"
    >
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="p-3 rounded-lg bg-gray-700 outline-none"
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 outline-none"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300"
        >
          {showPassword ? "🙈" : "👁"}
        </button>
      </div>

      <button
        type="submit"
        className="bg-green-500 p-3 rounded-lg hover:bg-green-600"
      >
        Login
      </button>
    </form>
  );
}

export default LoginForm;