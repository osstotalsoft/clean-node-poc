
function createIncident(incident) {
  return {
    id: 3,
    ...incident
  }
}

function loadById(id) {
  return {
    id,
    name: 'name',
    description: 'description',
    date: 'date',
    location: 'location'
  }
}

module.exports = { createIncident, loadById }