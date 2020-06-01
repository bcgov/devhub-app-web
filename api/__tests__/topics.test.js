import { createOrUpdateTopic,createNewRefFromBase } from "../src/controllers/topics"
import octokit from "../src/octokit"

import stubTopic from '../__fixtures__/topic1.json';
import stubGetRef from '../__fixtures__/getRef.json';
import stubCreateRef from '../__fixtures__/createRef.json';
import ajv from "ajv";

jest.mock('../src/octokit.js');
jest.mock('ajv');

ajv.prototype.compile = jest.fn();

octokit.git.getRef.mockImplementation(() => Promise.resolve({data: stubGetRef}));
octokit.git.createRef.mockImplementation(() => Promise.resolve({data: stubCreateRef}));

describe("Creating Topics", () => {
  test('Creates a new branch', async  () => {
    // mock validate to be true
   const res =  await  createNewRefFromBase('foo', 'bar', '/heads/master');
    expect(res).toEqual(stubCreateRef);
  });
})