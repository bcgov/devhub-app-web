import { fileTransformer } from '../utils/transformer';
import {
  markdownFrontmatterPlugin,
  pagePathPlugin,
  markdownUnfurlPlugin,
  markdownResourceTypePlugin,
} from '../utils/plugins';
import { PROCESSED_FILE_MD } from '../__fixtures__/fixtures';
import { createUnfurlObj, getClosestResourceType } from '../utils/helpers';
jest.mock('../utils/helpers.js');

createUnfurlObj.mockReturnValue({});
getClosestResourceType.mockReturnValue('');

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

  it('resolves file at end of chain', async () => {
    const plugin = jest.fn();
    plugin.mockReturnValue('file');
    const ft = fileTransformer(file.metadata.extension, file);
    const transformedContent = await ft.use(plugin).resolve();
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

    it('returns file if file is not md', () => {
      file.metadata.extension = 'txt';
      const result = markdownFrontmatterPlugin(file.metadata.extension, file);
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

    it('returns files if not md', () => {
      file.metadata.extension = 'txt';
      const result = markdownUnfurlPlugin(file.metadata.extension, file);
      expect(result).toBeDefined();
    });

    it('returns files if not md', () => {
      file.metadata.extension = 'txt';
      const result = markdownResourceTypePlugin(file.metadata.extension, file);
      expect(result).toBeDefined();
    });

    it('appends resourceType metadata property', () => {
      expect(file.metadata.resourceType).not.toBeDefined();
      const result = markdownResourceTypePlugin(file.metadata.extension, file);
      expect(result.metadata.resourceType).toBeDefined();
    });
  });
});
