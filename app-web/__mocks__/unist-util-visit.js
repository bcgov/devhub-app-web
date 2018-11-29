jest.requireActual('unist-util-visit');
module.exports = (ast, node, cb) => {
  if (ast.type === node) {
    cb(ast);
  }
};
