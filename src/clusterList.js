import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const Clusters = ({ clusters, onChange }) => {  // ask on key err message in chrome
  return (
    <div>
      <select onChange={onChange}>
        {clusters.get('clusters').toList().map(cluster =>
          <option value={cluster.get('id')} key={cluster.get('id')}>{cluster.get('name')}</option>)}
      </select>
    </div>
  )
}
Clusters.propTypes = {
  clusters: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    clusters: state.clusters,
  })
)(Clusters)
