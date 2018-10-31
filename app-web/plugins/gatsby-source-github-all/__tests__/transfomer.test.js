import { fileTransformer } from '../utils/transformer';
import { markdownFrontmatterPlugin } from '../utils/plugins';
import { PROCESSED_FILE_MD } from '../__fixtures__/fixtures';

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
    ft.use(plugin);
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

  it("throws if plugin doesn't return file", () => {
    const plugin = jest.fn();
    const ft = fileTransformer(file.metadata.extension, file);
    expect(() => {
      ft.use(plugin);
    }).toThrow(`Plugin ${plugin.name} must return file`);
  });

  describe('Markdown Plugin', () => {
    it('returns file', () => {
      const result = markdownFrontmatterPlugin(file.metadata.extension, file);
      expect(result).toBeDefined();
    });

    it('returns file if file is not md', () => {
      file.metadata.extension = 'txt';
      const result = markdownFrontmatterPlugin(file.metadata.extension, file);
      expect(result).toBeDefined();
    });
  });
});
