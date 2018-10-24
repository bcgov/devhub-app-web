const PARAGRAPH_AST = {
    'type': 'paragraph',
    'children': [
      {'type': 'text', 'value': 'GITHUB-EMBED GITHUB-EMBED'}
    ],
  };

const IMAGE_AST_ABSOLUTE = {
    'type': 'image',
    'url': 'https://www.google.com/images/dog.png',
    'children': [
      {'type': 'text', 'value': 'GITHUB-EMBED GITHUB-EMBED'}
    ],
};

const IMAGE_AST_RELATIVE = {
    'type': 'image',
    'url': '../images/dog.png',
    'children': [
      {'type': 'text', 'value': 'GITHUB-EMBED GITHUB-EMBED'}
    ],
};

const LINK_AST_ABSOLUTE = {
    'type': 'link',
    'url': 'https://www.google.com/images/dog.png',
    'children': [
      {'type': 'text', 'value': 'GITHUB-EMBED GITHUB-EMBED'}
    ],
};

const LINK_AST_RELATIVE = {
    'type': 'link',
    'url': '../images/dog.png',
    'children': [
      {'type': 'text', 'value': 'GITHUB-EMBED GITHUB-EMBED'}
    ],
};

module.exports = {
    PARAGRAPH_AST,
    IMAGE_AST_ABSOLUTE,
    IMAGE_AST_RELATIVE,
    LINK_AST_ABSOLUTE,
    LINK_AST_RELATIVE,
};
