import matter from 'gray-matter'; // eslint-disable-line
import { fileTransformer } from '../utils/transformer';
import { markdownFrontmatterPlugin, pagePathPlugin } from '../utils/plugins';
import {
  PROCESSED_FILE_MD,
  PROCESSED_FILE_TXT,
  RAW_FILE_MD_WITH_RESOURCEPATH,
} from '../__fixtures__/fixtures';

jest.unmock('@bcgov/common-web-utils');
jest.unmock('unist-util-visit');
jest.unmock('remark');
jest.unmock('gray-matter');

describe('Integration Tests Gatsby source github all transformer and Plugins', () => {
  let mdFile = PROCESSED_FILE_MD;

  test('transformer implicitly updates front matter with markdown plugin', () => {
    const data1 = matter(mdFile.content);
    expect(data1.data.title).not.toBeDefined();
    expect(data1.data.ignore).not.toBeDefined();
    expect(data1.data.resourcePath).not.toBeDefined();
    expect(data1.data.pageOnly).not.toBeDefined();
    const transformedFile = fileTransformer(mdFile.metadata.extension, mdFile)
      .use(markdownFrontmatterPlugin)
      .resolve();
    expect(transformedFile.content).not.toBe(mdFile.content);
    const data2 = matter(transformedFile.content, { foo: '---' });
    expect(data2.data.title).toBeDefined();
    expect(data2.data.ignore).toBe(false);
    expect(data2.data.resourcePath).toBe('');
    expect(data2.data.pageOnly).toBe(false);
  });

  test('transformer implicitly adds title front matter with markdown plugin', () => {
    const data1 = matter(mdFile.content);
    expect(data1.data.title).not.toBeDefined();
    const transformedFile = fileTransformer(mdFile.metadata.extension, mdFile)
      .use(markdownFrontmatterPlugin)
      .resolve();
    const data2 = matter(transformedFile.content);
    expect(data2.data.title).toBeDefined();
  });

  test('transformer implicitly adds ignore front matter with markdown plugin', () => {
    const data1 = matter(mdFile.content);
    expect(data1.data.ignore).not.toBeDefined();
    const transformedFile = fileTransformer(mdFile.metadata.extension, mdFile)
      .use(markdownFrontmatterPlugin)
      .resolve();
    const data2 = matter(transformedFile.content);
    expect(data2.data.ignore).toBe(false);
  });

  test('transformer implicitly adds resourcePath front matter with markdown plugin', () => {
    const data1 = matter(mdFile.content);
    expect(data1.data.resourcePath).not.toBeDefined();
    const transformedFile = fileTransformer(mdFile.metadata.extension, mdFile)
      .use(markdownFrontmatterPlugin)
      .resolve();
    const data2 = matter(transformedFile.content);
    expect(data2.data.resourcePath).toBe('');
  });

  test('transformer implicitly adds pageOnly front matter with markdown plugin', () => {
    const data1 = matter(mdFile.content);
    expect(data1.data.pageOnly).not.toBeDefined();
    const transformedFile = fileTransformer(mdFile.metadata.extension, mdFile)
      .use(markdownFrontmatterPlugin)
      .resolve();
    const data2 = matter(transformedFile.content);
    expect(data2.data.pageOnly).toBe(false);
  });

  test('transformer leaves text files alone with markdown plugin', () => {
    const transformedContent = fileTransformer(
      PROCESSED_FILE_TXT.metadata.extension,
      PROCESSED_FILE_TXT
    )
      .use(markdownFrontmatterPlugin)
      .resolve();
    expect(transformedContent).toEqual(PROCESSED_FILE_TXT);
  });

  test('transformer sets resourcePath to be resourcePath from metadata if it exists', () => {
    const data = matter(RAW_FILE_MD_WITH_RESOURCEPATH.content);
    expect(data.data.resourcePath).toBeDefined();
    const transformedFile = fileTransformer(
      RAW_FILE_MD_WITH_RESOURCEPATH.metadata.extension,
      RAW_FILE_MD_WITH_RESOURCEPATH
    )
      .use(pagePathPlugin)
      .resolve();
    expect(transformedFile.metadata.resourcePath).toBe(data.data.resourcePath);
  });

  test('transformer sets pagePath to gatsby create page path by default', () => {
    const data = matter(mdFile.content);
    const { metadata: { source, name } } = mdFile;
    expect(data.data.resourcePath).not.toBeDefined();
    const transformedFile = fileTransformer(mdFile.metadata.extension, mdFile)
      .use(markdownPagePathPlugin)
      .resolve();
    expect(transformedFile.metadata.resourcePath).toBe(
      `/${source}/${source}${name}https:/github.com/bcgov/design-system/blob/master/components/header/README.md`
    );
  });
});
