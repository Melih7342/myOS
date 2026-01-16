import { useEffect, useState } from "react";
import Navbar from "../SharedComponents/NavbarComponent.jsx";
import { useNavigate } from "react-router-dom";

function Catalogpage() {
  const [distros, setDistros] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3100/distros", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch distros");
        return res.json();
      })
      .then((data) => {
        setDistros(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredDistros = distros.filter((distro) =>
    distro.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border" />
      </div>
    );
  if (error)
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h2 className="mb-3">Distro Library</h2>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search distro..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="row">
          {filteredDistros.map((distro) => (
            <div
              key={distro.id}
              className="col-md-4 col-sm-6 mb-3"
              onClick={() => navigate(`/detail/${distro.id}`, { state: { distro, from: 'catalog' } })} // Cristina
              style={{ cursor: "pointer" }}
            >
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h5 className="card-title mb-0 text-center">{distro.name}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Catalogpage;
