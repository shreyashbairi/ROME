import './Welcome.css';

function Welcome () {
  return (
    <div calss="Welcome-page">
    <h1 class="Welcome-header">Weclome to Rome</h1>
    <a href="/login">
        <button type="button" class="btn btn-secondary">Login</button>
    </a>
    <a href="/signup">
        <button type="button" class="btn btn-secondary">Signup</button>
    </a>
    </div>
  );
}

export default Welcome;
