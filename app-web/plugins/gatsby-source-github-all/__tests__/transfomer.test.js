import { fileTransformer, } from '../utils/transformer';
import { markdownPlugin, } from '../utils/plugins';
import { PROCESSED_FILE, } from '../__fixtures__/fixtures';

describe('Transformer System', () => {
  let file = null;
  beforeEach(() => {
    file = PROCESSED_FILE;
  });

  it('returns without crashing', () => {
    expect(fileTransformer(file.metadata.extension, file.content));
  });

  it('calls plugins when used', () => {
    const plugin = jest.fn();
    plugin.mockReturnValue('content');
    const ft = fileTransformer(file.metadata.extension, file.content, file);
    ft.use(plugin);
    expect(plugin).toHaveBeenCalledWith(
      file.metadata.extension,
      file.content,
      file,
      {}
    );
  });

  it('resolves content at end of chain', () => {
    const plugin = jest.fn();
    plugin.mockReturnValue('content');
    const ft = fileTransformer(file.metadata.extension, file.content, file);
    const transformedContent = ft.use(plugin).resolve();
    expect(transformedContent).toBeDefined();
    expect(typeof transformedContent).toBe('string');
  });

  it('throws if plugin isn\'t a function', () => {
    const plugin = null;
    const ft = fileTransformer(file.metadata.extension, file.content, file);
    expect(() => {
      ft.use(plugin);
    }).toThrow('Plugin must be function');
  });

  it('throws if plugin doesn\'t return content', () => {
    const plugin = jest.fn();
    const ft = fileTransformer(file.metadata.extension, file.content);
    expect(() => {
      ft.use(plugin);
    }).toThrow(`Plugin ${plugin.name} must return content`);
  });

  describe('Markdown Plugin', () => {
    it('returns content', () => {
      const result = markdownPlugin(
        file.metadata.extension,
        file.content,
        file
      );
      expect(result).toBeDefined();
    });

    it('returns content if file is not md', () => {
      file.metadata.extension = 'txt';
      const result = markdownPlugin(
        file.metadata.extension,
        file.content,
        file
      );
      expect(result).toBeDefined();
    });
  });
});
