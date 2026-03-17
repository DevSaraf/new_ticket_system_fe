import { useState } from "react";
import { API_BASE_URL } from '../../config';
import Logo from "../../assets/img/logo.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ Save token
      localStorage.setItem("token", data.token);

      // ✅ Save user info
      localStorage.setItem("role", data.user.role);
      if (data.user.agent_type) {
        localStorage.setItem("agent_type", data.user.agent_type);
      }
      if (data.user.customer_type) {
        localStorage.setItem("customer_type", data.user.customer_type);
      }

      // ✅ Role-based redirection
      if (data.user.role === "agent") {
        switch (data.user.agent_type) {
          case "normal":
            window.location.href = "/normal-agent-dashboard";
            break;
          case "hod":
            window.location.href = "/hod-dashboard";
            break;
          case "admin":
            window.location.href = "/admin-dashboard";
            break;
          default:
            alert("Unknown agent type");
        }
      }

      if (data.user.role === "customer") {
        if (data.user.customer_type === "customer") {
          window.location.href = "/customer-dashboard";
        } else if (data.user.customer_type === "manager") {
          window.location.href = "/manager-dashboard";
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-gray bg-cover">
      <div className="container">
        <div className="row justify-content-center">
          <div className="login-card">
            <div className="card o-hidden border-0 shadow-lg login-panel">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="p-5">
                      <div className="text-center">
                        <img src={Logo} alt="Logo" className="mb-3" />
                      </div>

                      <form className="user" onSubmit={handleSubmit}>
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user"
                            placeholder="Enter Email Address..."
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                        </div>

                        <div className="form-group">
                          <input
                            type="password"
                            className="form-control form-control-user"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <button
                          type="submit"
                          className="btn btn-primary btn-user btn-block"
                          disabled={loading}
                        >
                          {loading ? "Logging in..." : "Login"}
                        </button>
                      </form>

                      <hr />
                      <div className="text-center">
                        <a className="small" href="#">
                          Forgot Password?
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
