import Ajv from 'ajv';
import schema from '../src/schemas/topic.json'

const ajv = new Ajv();

const validate = ajv.compile(schema);

const schema1 = {
    "name": "agile delivery",
    "description": "BC Government's home on GitHub. Open source code developed by and for the BC Government resides here.",
    "sourceProperties": {
      "sources": [
        {
          "sourceType": "web",
          "sourceProperties": {	
            "url": "https://github.com",
            "title": "title",
            "description": "source description"
          },
          "resourceType": "Components"
        }
      ]
    }
  }

  const schema2 = {
    "name": "agile delivery",
    "sourceProperties": {
      "sources": [
        {
          "sourceType": "foo",
          "sourceProperties": {	
            "url": "https://github.com",
            "owner": "John Smith",
            "files": ["foo.md", "bar.md"]
          },
          "resourceType": "baz"
        }
      ]
    }
  }

describe('Validate JSON Payload', () => {
    test('Validate returns true if JSON payload follows topic registry schema', async () => {
        const isValidData = validate(schema1)
        expect(isValidData).toBe(true)
    });

    test('Validate returns false if JSON payload does not follow topic registry schema', async () => {
        const isValidData = validate(schema2)
        expect(isValidData).toBe(false)
    });

  });