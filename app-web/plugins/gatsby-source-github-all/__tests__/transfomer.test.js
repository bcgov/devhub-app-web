import { fileTransformer } from '../utils/transformer';
import { PROCESSED_FILE } from '../__fixtures__/fixtures';

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
      const ft = fileTransformer(file.metadata.extension, file.content);
      ft.use(plugin);
      expect(plugin).toHaveBeenCalledWith(file.metadata.extension, file.content, {});
  });

  it('resolves content at end of chain', () => {
    const plugin = jest.fn();
      plugin.mockReturnValue('content');
      const ft = fileTransformer(file.metadata.extension, file.content);
      const transformedContent = ft.use(plugin).resolve();
      expect(transformedContent).toBeDefined();
      expect(typeof transformedContent).toBe('string');
  });

  it('throws if plugin isn\'t a function', () => {
    const plugin = null;
    const ft = fileTransformer(file.metadata.extension, file.content);
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
});
