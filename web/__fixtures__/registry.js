export const JOURNEY_REGISTRY = [
  {
    name: 'New Developer',
    sourceProperties: {
      stops: [
        {
          stops: [{ id: 10 }],
          id: 11,
        },
        {
          stops: [{ id: 13 }, { id: 14 }],
          id: 12,
        },
      ],
    },
  },
  {
    name: 'New Developer',
    sourceProperties: {
      stops: [
        {
          stops: [{ id: 2 }],
          id: 1,
        },
        {
          stops: [{ id: 4 }, { id: 5 }],
          id: 3,
        },
      ],
    },
  },
];

export const JOURNEY_REGISTRY_MAPPED_AS_TOPIC = [
  {
    name: 'New Developer',
    sourceProperties: {
      sources: [
        { id: 11 },
        {
          id: 10,
          connectsWith: {
            id: 11,
          },
        },
        {
          id: 12,
        },
        {
          id: 13,
          connectsWith: {
            id: 12,
          },
        },
        {
          id: 14,
          connectsWith: {
            id: 12,
          },
        },
      ],
    },
  },
  {
    name: 'New Developer',
    sourceProperties: {
      sources: [
        {
          id: 1,
        },
        {
          id: 2,
          connectsWith: {
            id: 1,
          },
        },
        {
          id: 3,
        },
        {
          id: 4,
          connectsWith: {
            id: 3,
          },
        },
        {
          id: 5,
          connectsWith: {
            id: 3,
          },
        },
      ],
    },
  },
];
