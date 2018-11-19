import matter from 'gray-matter'; // eslint-disable-line
import { fileTransformer } from '../utils/transformer';
import {
  markdownFrontmatterPlugin,
  pagePathPlugin,
  markdownResourceTypePlugin,
  externalLinkUnfurlPlugin,
} from '../utils/plugins';
import {
  PROCESSED_FILE_MD,
  PROCESSED_FILE_TXT,
  RAW_FILE_MD_WITH_RESOURCEPATH,
} from '../__fixtures__/fixtures';

jest.unmock('@bcgov/common-web-utils');
jest.unmock('unist-util-visit');
jest.unmock('remark');
jest.unmock('string-similarity');
jest.unmock('gray-matter');
jest.unmock('../utils/helpers');

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

  test('transformer implicitly adds resourceType front matter with markdown plugin', () => {
    const data1 = matter(mdFile.content);
    expect(data1.data.resourceType).not.toBeDefined();
    const transformedFile = fileTransformer(mdFile.metadata.extension, mdFile)
      .use(markdownFrontmatterPlugin)
      .resolve();
    const data2 = matter(transformedFile.content);
    expect(data2.data.resourceType).toBeDefined();
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
      .use(pagePathPlugin)
      .resolve();
    expect(transformedFile.metadata.resourcePath).toBe(
      `/${source}/${source}${name}https:/github.com/bcgov/design-system/blob/master/components/header/README.md`
    );
  });

  test('transformer sets resourceType by the globalResourceType', () => {
    const mdFile = { ...PROCESSED_FILE_MD, metadata: { ...PROCESSED_FILE_MD.metadata } };
    mdFile.metadata.globalResourceType = 'Documentation';
    const transformedFile = fileTransformer(mdFile.metadata.extension, mdFile)
      .use(markdownResourceTypePlugin)
      .resolve();
    expect(transformedFile.metadata.resourceType).toBe('Documentation');
  });

  test('transformer sets resourceType by the frontmatter resourceType if valid', () => {
    const mdFile = { ...PROCESSED_FILE_MD, metadata: { ...PROCESSED_FILE_MD.metadata } };
    mdFile.content = '---\nresourceType: Documentation\n---';
    expect(mdFile.metadata.globalResourceType).not.toBeDefined();
    const transformedFile = fileTransformer(mdFile.metadata.extension, mdFile)
      .use(markdownResourceTypePlugin)
      .resolve();
    expect(transformedFile.metadata.resourceType).toBe('Documentation');
  });

  test('transformer sets resourceType by the frontmatter closely matched resourceType ', () => {
    const mdFile = { ...PROCESSED_FILE_MD, metadata: { ...PROCESSED_FILE_MD.metadata } };
    mdFile.content = '---\nresourceType: Drocumentation\n---';
    expect(mdFile.metadata.globalResourceType).not.toBeDefined();
    const transformedFile = fileTransformer(mdFile.metadata.extension, mdFile)
      .use(markdownResourceTypePlugin)
      .resolve();
    expect(transformedFile.metadata.resourceType).toBe('Documentation');
  });

  test("transformer sets resourceType to be '' when invalid ", () => {
    const mdFile = { ...PROCESSED_FILE_MD, metadata: { ...PROCESSED_FILE_MD.metadata } };
    mdFile.content = '---\nresourceType: sadfklj\n---';
    expect(mdFile.metadata.globalResourceType).not.toBeDefined();
    const transformedFile = fileTransformer(mdFile.metadata.extension, mdFile)
      .use(markdownResourceTypePlugin)
      .resolve();
    expect(transformedFile.metadata.resourceType).toBe('');

    mdFile.content = '---\nresourceType: AwesomePossum\n---';
    const transformedFile2 = fileTransformer(mdFile.metadata.extension, mdFile)
      .use(markdownResourceTypePlugin)
      .resolve();
    expect(transformedFile2.metadata.resourceType).toBe('');
  });

  test('transformer unfurls an external resource path', async () => {
    const file = {
      metadata: {
        resourcePath: 'www.example.com',
      },
    };

    const transformedFile = await fileTransformer('.md', file)
      .use(externalLinkUnfurlPlugin)
      .resolve();

    expect(transformedFile.metadata.unfurl).toBeDefined();
  });
});
