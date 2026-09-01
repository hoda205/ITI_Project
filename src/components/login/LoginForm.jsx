function LoginForm() {
  return (
    <form>
      <div>
        <label htmlFor="email">Email Address *</label>
        <div>
          <input
            type="email"
            id="email"
            placeholder="you@example.com"
            required
          />
        </div>
      </div>

      <div>
        <div>
          <label htmlFor="password">Password *</label>
          <a href="#forgot">Forgot password?</a>
        </div>
        <div>
        
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
         
        </div>
      </div>

      <div>
        <input type="checkbox" id="remember" />
        <label htmlFor="remember">Remember me on this device</label>
      </div>

      <button type="submit">Sign In</button>

    
    </form>
  );
}

export default LoginForm;