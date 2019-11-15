// this fixture contains html ast that has a react-rehype style preview component

export const REMARK_NODE_WITH_AST = {
  id: '1198097e-da96-5797-8829-44b33e86a607',
  frontmatter: {
    title: 'Header - Basic',
    labels: {
      app: 'Searchgate',
      importance: 2,
    },
    description: 'This is a description of the markdown Remark',
  },
  htmlAst: {
    type: 'root',
    children: [
      {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'img',
            properties: {
              src: 'https://img.shields.io/badge/Recommended-Draft-orange.svg',
              alt: 'Status',
            },
            children: [],
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'blockquote',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'p',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Last Updated: February 11, 2019',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h1',
        properties: {
          id: 'header---basic',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#header---basic',
              ariaLabel: 'header   basic permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'Header - Basic',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          {
            type: 'text',
            value:
              'Headers help people understand what the product or service is about while providing a consistent look, feel, and functionality across government sites.',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h2',
        properties: {
          id: 'example',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#example',
              ariaLabel: 'example permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'Example',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          {
            type: 'element',
            tagName: 'component-preview',
            properties: {
              path: 'components/header/sample.html',
              height: '100px',
              width: '800px',
            },
            children: [],
          },
          {
            type: 'text',
            value: ' ',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h3',
        properties: {
          id: 'download',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#download',
              ariaLabel: 'download permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'Download',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'ul',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'element',
                tagName: 'a',
                properties: {
                  href:
                    'https://github.com/bcgov/design-system/tree/master/components/assets/images',
                },
                children: [
                  {
                    type: 'text',
                    value: 'BC Gov Logo',
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h2',
        properties: {
          id: 'requirements',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#requirements',
              ariaLabel: 'requirements permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'Requirements',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'ul',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value:
                  'This header must appear on all public-facing online B.C. Government content and services',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h2',
        properties: {
          id: 'dont-use-this-when',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#dont-use-this-when',
              ariaLabel: 'dont use this when permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: "Don't Use This when:",
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'ul',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Your product or service is not owned by the Government of British Columbia',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h2',
        properties: {
          id: 'design-guidance',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#design-guidance',
              ariaLabel: 'design guidance permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'Design Guidance:',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'ul',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Align content on page with left side of logo',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          {
            type: 'text',
            value:
              'The text in the header should include the site title or service name. If the website is a service, a good name should:',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'ul',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Use the words users (regular people) use',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Be based on analytics and user research',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Describe a task not a technology',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Not need to change when policy or technology changes',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Include verbs not nouns',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Not include government department or agency names',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Not be brand-driven or focused on marketing',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          {
            type: 'text',
            value: 'Good examples include:',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'ul',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Apply for MSP',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Get help with court fees',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Renew your license',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Find a career',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          {
            type: 'text',
            value: '*Adapted from the UK Government’s ',
          },
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: 'https://www.gov.uk/service-manual/design/naming-your-service',
            },
            children: [
              {
                type: 'text',
                value: 'Service Naming Guide',
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h2',
        properties: {
          id: 'rationale',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#rationale',
              ariaLabel: 'rationale permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'Rationale',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          {
            type: 'text',
            value:
              'This header matches the mandatory branding requirements of the BC Government. Consistent branding helps users identify who owns the service they are using. The horizontal logo is used instead of a the vertical version to use space efficiently and create a symmetrical flow from the logo to the heading.',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h2',
        properties: {
          id: 'behaviour',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#behaviour',
              ariaLabel: 'behaviour permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'Behaviour',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'ol',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value:
                  'Clicking on B.C. government logo links the user back to the homepage of your service ',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h3',
        properties: {
          id: 'mobile-design',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#mobile-design',
              ariaLabel: 'mobile design permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'Mobile Design',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'ol',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Logo and title shrink until mobile size',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'When in mobile view the header title drops below the vertical logo',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h2',
        properties: {
          id: 'accessibility',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#accessibility',
              ariaLabel: 'accessibility permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'Accessibility',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          {
            type: 'text',
            value: 'This header has been built according to ',
          },
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: 'https://www.w3.org/TR/WCAG20/',
            },
            children: [
              {
                type: 'text',
                value: 'WCAG 2.0 AA',
              },
            ],
          },
          {
            type: 'text',
            value: '. This component includes the following accessibility features:',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h3',
        properties: {
          id: 'screenreaders',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#screenreaders',
              ariaLabel: 'screenreaders permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'Screenreaders',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'ul',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value:
                  'ALT text for BC Government logo reads "Go to the homepage of [current website]"',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'p',
        properties: {},
        children: [
          {
            type: 'text',
            value: 'As read using ChromeVox',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'blockquote',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'p',
            properties: {},
            children: [
              {
                type: 'element',
                tagName: 'em',
                properties: {},
                children: [
                  {
                    type: 'text',
                    value: '"Go to the government of british columbia website link."',
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'blockquote',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'p',
            properties: {},
            children: [
              {
                type: 'element',
                tagName: 'em',
                properties: {},
                children: [
                  {
                    type: 'text',
                    value: '"Hello British Columbia heading one."',
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h2',
        properties: {
          id: 'code',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#code',
              ariaLabel: 'code permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'Code',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h3',
        properties: {
          id: 'html',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#html',
              ariaLabel: 'html permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'HTML',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['gatsby-highlight'],
          dataLanguage: 'html',
        },
        children: [
          {
            type: 'element',
            tagName: 'pre',
            properties: {
              className: ['language-html'],
            },
            children: [
              {
                type: 'element',
                tagName: 'code',
                properties: {
                  className: ['language-html'],
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'comment'],
                    },
                    children: [
                      {
                        type: 'text',
                        value:
                          '<!--\n  All in-line CSS is specific to this sample; it can and should be ignored.\n -->',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'tag'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'tag'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '<',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'header',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '>',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n    ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'tag'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'tag'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '<',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'div',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        value: ' ',
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'attr-name'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: 'class',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'attr-value'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '=',
                              },
                            ],
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '"',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'banner',
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '"',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '>',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n        ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'tag'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'tag'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '<',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'a',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        value: ' ',
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'attr-name'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: 'href',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'attr-value'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '=',
                              },
                            ],
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '"',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'https://gov.bc.ca',
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '"',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'text',
                        value: ' ',
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'attr-name'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: 'alt',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'attr-value'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '=',
                              },
                            ],
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '"',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'British Columbia',
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '"',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '>',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n          ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'tag'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'tag'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '<',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'img',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        value: ' ',
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'attr-name'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: 'src',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'attr-value'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '=',
                              },
                            ],
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '"',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: '../assets/images/BCID_H_rgb_rev.svg',
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '"',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'text',
                        value: ' ',
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'attr-name'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: 'alt',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'attr-value'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '=',
                              },
                            ],
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '"',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'Go to the Government of British Columbia website',
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '"',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'text',
                        value: ' ',
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '/>',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n        ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'tag'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'tag'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '</',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'a',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '>',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n        ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'tag'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'tag'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '<',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'h1',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '>',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: 'Hello British Columbia',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'tag'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'tag'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '</',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'h1',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '>',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n    ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'tag'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'tag'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '</',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'div',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '>',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n    ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'tag'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'tag'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '<',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'div',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        value: ' ',
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'attr-name'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: 'class',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'attr-value'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '=',
                              },
                            ],
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '"',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'other',
                          },
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '"',
                              },
                            ],
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '>',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n    ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'comment'],
                    },
                    children: [
                      {
                        type: 'text',
                        value:
                          '<!-- \n      This place is for anything that needs to be right aligned\n      beside the logo.  \n    -->',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n      ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'entity'],
                      title: ' ',
                    },
                    children: [
                      {
                        type: 'text',
                        value: '&nbsp;',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n    ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'tag'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'tag'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '</',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'div',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '>',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n    ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'tag'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'tag'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '</',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'div',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '>',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'tag'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'tag'],
                        },
                        children: [
                          {
                            type: 'element',
                            tagName: 'span',
                            properties: {
                              className: ['token', 'punctuation'],
                            },
                            children: [
                              {
                                type: 'text',
                                value: '</',
                              },
                            ],
                          },
                          {
                            type: 'text',
                            value: 'header',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '>',
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h3',
        properties: {
          id: 'css',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#css',
              ariaLabel: 'css permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'CSS',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['gatsby-highlight'],
          dataLanguage: 'css',
        },
        children: [
          {
            type: 'element',
            tagName: 'pre',
            properties: {
              className: ['language-css'],
            },
            children: [
              {
                type: 'element',
                tagName: 'code',
                properties: {
                  className: ['language-css'],
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'selector'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'header',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '{',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'background-color',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' #036',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'border-bottom',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' 2px solid #fcba19',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'padding',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' 0 65px 0 65px',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'color',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' #fff',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'display',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' flex',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'height',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' 65px',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'top',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' 0px',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'position',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' fixed',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'width',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' 100%',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '}',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'selector'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'header h1',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '{',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'font-family',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' ‘Noto Sans’',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ',',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' Verdana',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ',',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' Arial',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ',',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' sans-serif',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'font-weight',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' normal',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'comment'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '/* 400 */',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'margin',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' 5px 5px 0 18px',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'visibility',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' hidden',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '}',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'selector'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'header .banner',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '{',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'display',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' flex',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'justify-content',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' flex-start',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'align-items',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' center',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'margin',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' 0 10px 0 0',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'comment'],
                    },
                    children: [
                      {
                        type: 'text',
                        value:
                          '/* border-style: dotted;\n  border-width: 1px;\n  border-color: lightgrey; */',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '}',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'selector'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'header .other',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '{',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'display',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' flex',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'flex-grow',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' 1',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'comment'],
                    },
                    children: [
                      {
                        type: 'text',
                        value:
                          '/* border-style: dotted;\n  border-width: 1px;\n  border-color: lightgrey; */',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '}',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'comment'],
                    },
                    children: [
                      {
                        type: 'text',
                        value:
                          '/*\n  These are sample media queries only. Media queries are quite subjective\n  but, in general, should be made for the three different classes of screen\n  size: phone, tablet, full. \n*/',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'atrule'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'rule'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '@media',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        value: ' screen and ',
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '(',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'property'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: 'min-width',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: ':',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        value: ' 600px',
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: ')',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        value: ' and ',
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '(',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'property'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: 'max-width',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: ':',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        value: ' 899px',
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: ')',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '{',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'selector'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'header h1',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '{',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n    ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'font-size',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'function'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'calc',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '(',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '7px + 2.2vw',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ')',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n    ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'visibility',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' visible',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '}',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '}',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'atrule'],
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'rule'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '@media',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        value: ' screen and ',
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: '(',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'property'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: 'min-width',
                          },
                        ],
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: ':',
                          },
                        ],
                      },
                      {
                        type: 'text',
                        value: ' 900px',
                      },
                      {
                        type: 'element',
                        tagName: 'span',
                        properties: {
                          className: ['token', 'punctuation'],
                        },
                        children: [
                          {
                            type: 'text',
                            value: ')',
                          },
                        ],
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '{',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'selector'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'header h1',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '{',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n    ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'font-size',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' 2.0em',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n    ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'property'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: 'visibility',
                      },
                    ],
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ':',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: ' visible',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: ';',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n  ',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '}',
                      },
                    ],
                  },
                  {
                    type: 'text',
                    value: '\n',
                  },
                  {
                    type: 'element',
                    tagName: 'span',
                    properties: {
                      className: ['token', 'punctuation'],
                    },
                    children: [
                      {
                        type: 'text',
                        value: '}',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'h3',
        properties: {
          id: 'assets',
        },
        children: [
          {
            type: 'element',
            tagName: 'a',
            properties: {
              href: '#assets',
              ariaLabel: 'assets permalink',
              className: ['anchor'],
            },
            children: [
              {
                type: 'element',
                tagName: 'svg',
                properties: {
                  ariaHidden: 'true',
                  focusable: 'false',
                  height: '16',
                  version: '1.1',
                  viewBox: '0 0 16 16',
                  width: '16',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'path',
                    properties: {
                      fillRule: 'evenodd',
                      d:
                        'M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z',
                    },
                    children: [],
                  },
                ],
              },
            ],
          },
          {
            type: 'text',
            value: 'Assets',
          },
        ],
      },
      {
        type: 'text',
        value: '\n',
      },
      {
        type: 'element',
        tagName: 'ol',
        properties: {},
        children: [
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Logo',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
          {
            type: 'element',
            tagName: 'li',
            properties: {},
            children: [
              {
                type: 'text',
                value: 'Font download or reference link',
              },
            ],
          },
          {
            type: 'text',
            value: '\n',
          },
        ],
      },
    ],
    data: {
      quirksMode: false,
    },
  },
};
