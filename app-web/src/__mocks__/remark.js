const remark = jest.requireActual('remark');

module.exports = {
  parse: () => ({
    type: 'root',
    children: [
      {
        type: 'heading',
        depth: 1,
        children: [
          {
            type: 'text',
            value: 'Heading',
          },
        ],
        position: {
          start: {
            line: 1,
          },
        },
      },
    ],
  }),
};
