const DEFAULT_CARDS = [
  // BACKLOG
  {
    title: 'Look into render bug in dashboard',
    id: '1',
    column: 'backlog',
    due: '10 Jan',
  },
  { title: 'Review checklist', id: '2', column: 'backlog', due: '10 Jan' },
  { title: 'Migrate to Azure', id: '3', column: 'backlog', due: '10 Jan' },
  {
    title: 'Document Notifications service',
    id: '4',
    column: 'backlog',
    due: '10 Jan',
  },
  // TODO
  {
    title: 'Research DB options for new microservice',
    id: '5',
    column: 'todo',
    due: '10 Jan',
  },
  {
    title: 'Add new Features to existing elements',
    id: '6',
    column: 'todo',
    due: '10 Jan',
  },
  {
    title: 'Sync with product on Q3 roadmap',
    id: '7',
    column: 'todo',
    due: '10 Jan',
  },

  // DOING
  {
    title: 'Refactor context providers to use Zustand',
    id: '8',
    column: 'doing',
    due: '10 Jan',
  },
  {
    title: 'Define new JSON for dummy data',
    id: '9',
    column: 'doing',
    due: '10 Jan',
  },
  // DONE
  {
    title: 'Set up dashboards for Lambda',
    id: '10',
    column: 'done',
    due: '10 Jan',
  },
  {
    title: 'Set up GraphQL Schema',
    id: '11',
    column: 'doing',
    due: '20 Jan',
  },
]

export default DEFAULT_CARDS
