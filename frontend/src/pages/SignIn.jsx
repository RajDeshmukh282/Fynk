const SignIn = () => {
  return (
    <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignIn;
