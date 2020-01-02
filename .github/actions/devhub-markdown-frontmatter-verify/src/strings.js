const NO_DESCRIPTION = `
  No description frontmatter field found. A markdown file requires a 
  description frontmatter field at top of the file so that is can provide a preview of what the
  content is about in the Devhub.
  Sample frontmatter below
  ---
  description: Learn about PIAs - why they are important and how to get started.  
  ---`;

const LONG_DESCRIPTION = `Descriptions in front matter should be concise. Aim for a character length of one hundrend fourty or less.`;

const TOO_LONG_DESCRIPTION = `The description in the frontmatter is too long and should be less than one hundrend fourty characters`;

const TITLE_MISMATCH = `
  The Devhub will automatically use the first h1 or h2 in the first paragraph of a markdown file as the title.
  If your document doesn't have a title, then add the title frontmatter field to give it one.

  Pro Tip: Giving your title a generic name like 'About' or 'How-To' is not helpful in a documentation site. 
  In future versions of this validation script, these title will automatically fail the PR. 
`;

module.exports = {
  NO_DESCRIPTION,
  LONG_DESCRIPTION,
  TOO_LONG_DESCRIPTION,
  TITLE_MISMATCH,
};
