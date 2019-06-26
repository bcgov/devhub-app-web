import { SIPHON_QL_NODE } from '../../__fixtures__/plugin-fixtures';
import { converter } from '../../src/utils/gatsbyRemark';

describe('Gatsby Remark Transformer Path Converter', () => {
  const markdownNode = {
    internal: {
      type: 'MarkdownRemark',
    },
  };
  const getNode = jest.fn(() => ({
    _metadata: {
      sourceLocations: [],
    },
  }));

  test('it only transforms sourceDevHubGithub nodes', () => {
    const path = './something.png';
    const astType = 'image';
    const node = {
      internal: {
        type: 'notsourceDevhubGithub',
      },
    };
    expect(converter(astType, path, markdownNode, node, { getNode })).toBe(path);
  });

  test('it returns path on sourceDevhubGithub nodes', () => {
    const path = './somthing.png';
    const astType = 'image';
    const newPath = converter(astType, path, markdownNode, SIPHON_QL_NODE, { getNode });
    expect(typeof newPath).toBe('string');
    expect(newPath).not.toBe(path);
  });
});
