import validUrl from 'valid-url';
import { fileTransformer } from '../utils/transformer';
import {
  markdownFrontmatterPlugin,
  pagePathPlugin,
  markdownUnfurlPlugin,
  markDownUnfurlImagePlugin,
  markdownResourceTypePlugin,
  externalLinkUnfurlPlugin,
  markdownPersonaPlugin,
  repositoryResourcePathPlugin,
  markdownSlugPlugin,
} from '../utils/plugins';
import { PROCESSED_FILE_MD } from '../__fixtures__/fixtures';
import { PERSONAS_LIST, RESOURCE_TYPES } from '../utils/constants';
import {
  createUnfurlObj,
  getClosestResourceType,
  getClosestPersona,
  unfurlWebURI,
  mergeUnfurls,
  withUnfurlWarning,
} from '../utils/helpers';

jest.mock('../utils/helpers.js');

createUnfurlObj.mockReturnValue({});
getClosestResourceType.mockReturnValue('');
getClosestPersona.mockImplementation(persona => persona);
unfurlWebURI.mockReturnValue({});
mergeUnfurls.mockImplementation((oldUnfurl, newUnfurl) => newUnfurl);
withUnfurlWarning.mockImplementation((url, unfurl) => unfurl);

describe('Transformer System', () => {
  let file = null;
  beforeEach(() => {
    file = PROCESSED_FILE_MD;
  });

  it('returns without crashing', () => {
    expect(fileTransformer(file.metadata.extension, file.content));
  });

  it('calls plugins when used', () => {
    const plugin = jest.fn();
    plugin.mockReturnValue('content');
    const ft = fileTransformer(file.metadata.extension, file);
    ft.use(plugin).resolve();
    expect(plugin).toHaveBeenCalledWith(file.metadata.extension, file, {});
  });

  it('resolves file at end of chain', () => {
    const plugin = jest.fn();
    plugin.mockReturnValue('file');
    const ft = fileTransformer(file.metadata.extension, file);
    const transformedContent = ft.use(plugin).resolve();
    expect(transformedContent).toBeDefined();
  });

  it("throws if plugin isn't a function", () => {
    const plugin = null;
    const ft = fileTransformer(file.metadata.extension, file);
    expect(() => {
      ft.use(plugin);
    }).toThrow('Plugin must be function');
  });

  it("throws if plugin doesn't return file", async () => {
    const plugin = jest.fn();
    const ft = fileTransformer(file.metadata.extension, file);
    try {
      await ft.use(plugin).resolve();
    } catch (e) {
      expect(e.message).toBe('Plugin must return the file');
    }
  });

  describe('Markdown Plugins', () => {
    afterEach(() => {
      file.metadata.extension = 'md';
    });

    it('returns file', async () => {
      const result = await markdownFrontmatterPlugin(file.metadata.extension, file);
      expect(result).toBeDefined();
    });

    it('returns file if file is not md', async () => {
      file.metadata.extension = 'txt';
      const result = await markdownFrontmatterPlugin(file.metadata.extension, file);
      expect(result).toBeDefined();
    });

    it('returns file', async () => {
      const result = await pagePathPlugin(file.metadata.extension, file);
      expect(result).toBeDefined();
    });

    it('returns file if file is not md', async () => {
      file.metadata.extension = 'txt';
      const result = await pagePathPlugin(file.metadata.extension, file);
      expect(result).toBeDefined();
    });

    it('returns file with unfurl', async () => {
      const result = await markdownUnfurlPlugin(file.metadata.extension, file);
      expect(result).toBeDefined();
      expect(result.metadata.unfurl).toBeDefined();
    });

    it('returns files if not md', async () => {
      file.metadata.extension = 'txt';
      const result = await markdownUnfurlPlugin(file.metadata.extension, file);
      expect(result).toBeDefined();
    });

    it('returns files if not md', async () => {
      file.metadata.extension = 'txt';
      const result = await markdownResourceTypePlugin(file.metadata.extension, file);
      expect(result).toBeDefined();
    });

    it('appends resourceType metadata property', async () => {
      expect(file.metadata.resourceType).not.toBeDefined();
      const result = await markdownResourceTypePlugin(file.metadata.extension, file);
      expect(result.metadata.resourceType).toBeDefined();
    });

    it('returns file', async () => {
      file.metadata.resourcePath =
        'http://www.bloomberg.com/news/articles/2016-05-24/as-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance';
      const result = await externalLinkUnfurlPlugin(file.metadata.extension, file);
      expect(result).toBeDefined();
    });

    it('returns files with unfurl property defined when no original unfurl exists', async () => {
      // remove the unfurl property
      file.metadata.unfurl = undefined;
      file.metadata.resourcePath =
        'http://www.bloomberg.com/news/articles/2016-05-24/as-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance';
      const result = await externalLinkUnfurlPlugin(file.metadata.extension, file);
      expect(result.metadata.unfurl).toBeDefined();
    });

    it('returns files with unfurl property defined when original unfurl does exist', async () => {
      // remove the unfurl property
      file.metadata.unfurl = { title: 'boopity boop' };
      file.metadata.resourcePath =
        'http://www.bloomberg.com/news/articles/2016-05-24/as-zenefits-stumbles-gusto-goes-head-on-by-selling-insurance';
      const result = await externalLinkUnfurlPlugin(file.metadata.extension, file);
      expect(result.metadata.unfurl).toBeDefined();
    });

    it('returns file if not md', async () => {
      file.metadata.extension = 'txt';
      const result = await markdownPersonaPlugin(file.metadata.extension, file, {
        personas: PERSONAS_LIST,
      });
      expect(result).toBeDefined();
    });

    it('appends persona metadata property', async () => {
      expect(file.metadata.personas).not.toBeDefined();
      const result = await markdownPersonaPlugin(file.metadata.extension, file, {
        personas: PERSONAS_LIST,
      });
      expect(result.metadata.personas).toBeDefined();
    });

    it('appends persona metadata property by front matter first', async () => {
      file.content = `---\npersona: Developer\n---`;
      const result = await markdownPersonaPlugin(file.metadata.extension, file, {
        personas: PERSONAS_LIST,
      });
      expect(result.metadata.personas).toEqual(['Developer']);
    });

    it('sets persona metadata property [] when no applicable persona is available', async () => {
      file.content = `---\n---`;
      file.metadata.globalPersonas = null;
      const result = await markdownPersonaPlugin(file.metadata.extension, file, {
        personas: PERSONAS_LIST,
      });
      expect(result.metadata.personas).toEqual([]);
    });

    it('sets resourcePath if resourceType is repositories', async () => {
      file.metadata.resourceType = RESOURCE_TYPES.REPOSITORIES;
      file.metadata.resourcePath = undefined;
      file.metadata.originalResourceLocation = 'https://www.google.com';
      const result = await repositoryResourcePathPlugin(file.metadata.extension, file);
      expect(result.metadata.resourcePath).toBe(file.metadata.originalResourceLocation);
    });

    it('returns file if not md', () => {
      file.metadata.extension = 'txt';
      const result = markDownUnfurlImagePlugin(file.metadata.extension, file);
      expect(result).toBeDefined();
    });

    it('corrects unfurl.image if it is relative', () => {
      const image = '../docs/image.png';
      const file = {
        html_url: 'https://github.com/foo/bar/blob/master/components/header/readme.md',
        metadata: {
          unfurl: { image },
          extension: 'md',
        },
      };
      validUrl.isWebUri.mockReturnValueOnce(false);
      const newFile = markDownUnfurlImagePlugin(file.metadata.extension, file);
      expect(newFile.metadata.unfurl.image).toBe(
        'https://github.com/foo/bar/blob/master/components/docs/image.png?raw=true',
      );
    });

    it('corrects unfurl.image if it is absolute without a domain', () => {
      const image = '/docs/image.png';
      const file = {
        html_url: 'https://github.com/foo/bar/blob/master/components/header/readme.md',
        url: 'https://github.com/foo/bar/blob/master/components/header/readme.md?ref=master',
        metadata: {
          owner: 'foo',
          source: 'bar',
          unfurl: { image },
          extension: 'md',
        },
      };
      validUrl.isWebUri.mockReturnValueOnce(false);
      const newFile = markDownUnfurlImagePlugin(file.metadata.extension, file);
      expect(newFile.metadata.unfurl.image).toBe(
        'https://github.com/foo/bar/blob/master/docs/image.png?raw=true',
      );
    });

    it("doesn't alter unfurl.image if it is a valid url", () => {
      const image = 'https://foo.com/docs/image.png';
      const file = {
        html_url: 'https://github.com/foo/bar/blob/master/components/header/readme.md',
        metadata: {
          unfurl: { image },
          extension: 'md',
        },
      };
      validUrl.isWebUri.mockReturnValueOnce(true);
      const newFile = markDownUnfurlImagePlugin(file.metadata.extension, file);
      expect(newFile.metadata.unfurl.image).toBe(image);
    });

    it("applies a slug property based on title if slug doesn't exist", () => {
      const file = {
        content: '---\ntitle: foo\n---',
        metadata: {
          extension: 'md',
        },
      };

      const newFile = markdownSlugPlugin(file.metadata.extension, file);
      expect(newFile.metadata.slug).toBe('foo');
    });
  });
});
