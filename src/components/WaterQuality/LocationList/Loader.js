import loader from "./loader.gif";

const Loader = () => {
  return (
    <div className="loader">
      <img src={loader} alt="Loading" />
      <h1>Loading Data</h1>
    </div>
  );
};

export default Loader;
