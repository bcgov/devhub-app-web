import { 
    assetRelativePathToAbsolute,
    isRelativePath,
    convertRelativePathsToAbsolute,
} from '../utils/utils';
import jsdom from 'jsdom'; // eslint-disable-line

const { JSDOM } = jsdom;

describe('gatsby-github-all-path-transformer', () => {
    describe('assetRelativePathToAbsolute', () => {
        test(`given the repo uri, a path to a file, and a valid 
            relative asset path, it returns the absolute verion of the asset path`, () => {
            const repoURI = 'www.github.com/bcgov/something/blob/master';
            const relativeAssetPath = './awesome.png';
            const pathToFile = '/readme.md';
            const absoluteAssetPath = `${repoURI}/awesome.png`;
            expect(assetRelativePathToAbsolute(pathToFile, repoURI, relativeAssetPath)).toBe(absoluteAssetPath);
        });
    
        test(`given the repo uri, a path to a file, and a valid 
            relative asset path that's odd, it returns the absolute verion of the asset path`, () => {
            const repoURI = 'www.github.com/bcgov/something/blob/master';
            const relativeAssetPath = '../something/../awesome.png';
            const pathToFile = '/docs/readme.md';
            const absoluteAssetPath = `${repoURI}/awesome.png`;
            expect(assetRelativePathToAbsolute(pathToFile, repoURI, relativeAssetPath)).toBe(absoluteAssetPath);
        });
    });

    describe('isRelativePath', () => {
        it('returns true if path is relative', () => {
            expect(isRelativePath('../something')).toBe(true);
            expect(isRelativePath('./something')).toBe(true);
        });
        
        it('returns false if path is absolute', () => {
            expect(isRelativePath('/something')).toBe(false);
        });
    });
    // this feels more like an integration test ??
    describe('convertRelativePathToAbsolute', () => {
        const repoURI = 'www.github.com/bcgov/something/blob/master';
        const pathToFile = '/docs/v1/readme.md';
        const content = `
            <div>
                <a id="1" href="https://www.google.com" >yo</a>
                <a id="2" href="../something.md" >yo</a>
                <a id="3" href="../../something2.md" >yo</a>
                <img id="4" src="../../../yo.png">
            </div>
        `;

        const dom = new JSDOM(convertRelativePathsToAbsolute(pathToFile, repoURI, content));
        const { window: { document } } = dom;
        
        const a1 = document.getElementById('1');
        const a2 = document.getElementById('2');
        const a3 = document.getElementById('3');
        const img4 = document.getElementById('4');

        expect(a1.getAttribute('href')).toBe('https://www.google.com');
        expect(a2.getAttribute('href')).toBe(`${repoURI}/docs/something.md`);
        expect(a3.getAttribute('href')).toBe(`${repoURI}/something2.md`);
        expect(img4.getAttribute('src')).toBe(`${repoURI}/yo.png`);
    });
});