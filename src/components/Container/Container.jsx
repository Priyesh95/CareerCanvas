import './Container.css'

function Container({ children, wide = false, className = '' }) {
  return (
    <div className={`container-component ${wide ? 'container-wide' : ''} ${className}`}>
      {children}
    </div>
  )
}

export default Container
