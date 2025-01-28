const events = {
    incidentCreated: (incident) => ({ type: 'incidentCreated', payload: incident }),
    incidentClosed: (incident) => ({ type: 'incidentClosed', payload: incident }),
    incidentAssigned: (incident, user) => ({ type: 'incidentAssigned', payload: { incident, user } })
}


function createIncident(name, description, date, location) {
    var incident = {
        name: name,
        description: description,
        date: date,
        location: location,
        assignedTo: [],
        category: 'mechanical',
    }
    return [incident, events.incidentCreated(incident)]
}

function assignIncident(incident, user) {
    if (incident.assignedTo.includes(user)) {
        throw new Error('User already assigned')
    }

    if (incident.status === 'closed') {
        throw new Error('Incident already closed')
    }


    incident.assignedTo.push(user)
    return [incident, events.incidentAssigned(incident, user)]
}

function closeIncident(incident) {
    if (incident.status === 'closed') {
        throw new Error('Incident already closed')
    }

    incident.status = 'closed'
    return [incident, events.incidentClosed(incident)]
}

module.exports = { createIncident, closeIncident }