import { Link } from 'react-router-dom'

function PlaceholderPage({ title }) {
  return (
    <section className="placeholder-page" aria-labelledby="placeholder-title">
      <h2 id="placeholder-title">{title}</h2>
      <Link className="back-link" to="/">
        &larr; Back to Dashboard
      </Link>
    </section>
  )
}

export default PlaceholderPage
