export const WAITING = 'WAITING'
export const ASSIGNED = 'ASSIGNED'
export const PICKED_UP = 'PICKED_UP'
export const DELIVERED = 'DELIVERED'

export const shipments = [
  {
    id: 1,
    origin: 'Miami',
    destination: 'Washington',
    assignee: null,
    status: WAITING,
    status_update_time: null
  },
  {
    id: 2,
    origin: 'Delhi',
    destination: 'Bangalore',
    assignee: null,
    status: WAITING,
    status_update_time: null
  },
  {
    id: 3,
    origin: 'London',
    destination: 'Geneva',
    assignee: null,
    status: WAITING,
    status_update_time: null
  },
  {
    id: 4,
    origin: 'Zurich',
    destination: 'Zug',
    assignee: null,
    status: WAITING,
    status_update_time: null
  },
  {
    id: 5,
    origin: 'Zug',
    destination: 'Basel',
    assignee: null,
    status: WAITING,
    status_update_time: null
  },
  {
    id: 6,
    origin: 'Lausanne',
    destination: 'Paris',
    assignee: null,
    status: WAITING,
    status_update_time: null
  },
  {
    id: 7,
    origin: 'Rom',
    destination: 'Vienna',
    assignee: null,
    status: WAITING,
    status_update_time: null
  },
  {
    id: 8,
    origin: 'Paris',
    destination: 'London',
    assignee: null,
    status: WAITING,
    status_update_time: null
  },
  {
    id: 9,
    origin: 'New York',
    destination: 'California',
    assignee: null,
    status: WAITING,
    status_update_time: null
  },
  {
    id: 10,
    origin: 'Florida',
    destination: 'Atlanta',
    assignee: null,
    status: WAITING,
    status_update_time: null
  },
  {
    id: 11,
    origin: 'Torronto',
    destination: 'London',
    assignee: 9,
    status: WAITING,
    status_update_time: null
  }
]
