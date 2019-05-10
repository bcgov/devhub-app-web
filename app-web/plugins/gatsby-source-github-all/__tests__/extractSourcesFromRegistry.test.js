import { extractSourcesFromRegistry } from '../utils/extractSourcesFromRegistry';

jest.mock('../utils/inferIdByType.js', () => ({
  inferIdByType: jest.fn(() => 'id'),
}));

describe('extractSourcesFromRegistry', () => {
  it('it flattens out the registry', () => {
    const registry = [
      {
        name: 'Authentication and Authorization',
        description:
          'Technical resources related to implementing authentication and authorization in government applications.',
        resourceType: 'Documentation',
        attributes: {
          personas: ['Developer'],
        },
        template: 'overview',
        sourceProperties: {
          sources: [
            {
              sourceType: 'web',
              sourceProperties: {
                url: 'https://sso.pathfinder.gov.bc.ca/',
                author: 'cvarjao',
                title: 'Red Hat Single Sign On (aka KeyCloak)',
                description:
                  'Red Hat Single Sign On is a modern, developer-friendly single sign on solution implementing the OpenID Connect specification as well as SAML.  The BC Gov implementation provides built-in intregration with IDIR, BCeID and GitHub and allow application developers to quickly meet the authentication needs of their applications. Red Hat SSO is the downstream, commercially supported distribution of the open source KeyCloak product.',
                image: 'http://design.jboss.org/keycloak/logo/images/keycloak_logo_600px.svg',
              },
            },
            {
              sourceType: 'github',
              sourceProperties: {
                url: 'https://github.com/bcdevops/openshift-wiki',
                owner: 'bcdevops',
                repo: 'openshift-wiki',
                files: ['docs/RH-SSO/RequestSSORealm.md', 'docs/RH-SSO/ServiceDefinition.md'],
              },
            },
            {
              sourceType: 'web',
              sourceProperties: {
                url:
                  'https://sminfo.gov.bc.ca/docs/Provincial%20IDIM%20Program%20-%20Building%20SiteMinder%20Integrated%20Apps%202.0.4.pdf',
                title: 'Building SiteMinder Integrated Applications',
                description:
                  'This document describes the methods that can be used to integrate web applications with the BC Governments SiteMinder infrastructure. \\n This document is intended for the architects, designers and developers producing web applications that integrate with the IDIM SiteMinder service.',
              },
            },
          ],
        },
      },
      {
        name: 'Developer Tools',
        description:
          'Tools to assist software developers in building, deploying, and running applications for BC Gov.',
        resourceType: 'Self-Service Tools',
        attributes: {
          personas: ['Developer'],
        },
        sourceProperties: {
          sources: [
            {
              sourceType: 'web',
              sourceProperties: {
                resourceType: 'Self-Service Tools',
                title: 'OpenShift Developer Console',
                description:
                  'This guide is intended for application developers, and provides instructions for setting up and configuring a workstation to develop and deploy applications in an OpenShift Container Platform.',
                url: 'https://console.pathfinder.gov.bc.ca:8443/console/projects',
              },
            },
            {
              sourceType: 'github',
              sourceProperties: {
                url: 'https://github.com/BCDevOps/openshift-wiki',
                owner: 'BCDevOps',
                repo: 'openshift-wiki',
                files: ['docs/API/KongAPI.md'],
              },
            },
            {
              sourceType: 'github',
              sourceProperties: {
                url: 'https://github.com/bcgov/devhub-resources',
                owner: 'bcgov',
                repo: 'devhub-resources',
                files: ['resources/tools/sizzy.md'],
              },
            },
            {
              sourceType: 'web',
              sourceProperties: {
                url: 'https://signing-web-devhub-prod.pathfinder.gov.bc.ca',
              },
            },
            {
              sourceType: 'web',
              sourceProperties: {
                url: 'https://github.com/bcgov',
                author: 'kelpisland',
                title: 'BC Gov on GitHub',
                description:
                  "BC Government's home on GitHub. Open source code developed by and for the BC Government resides here.",
                image: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png',
              },
            },
            {
              sourceType: 'web',
              sourceProperties: {
                url: 'https://sso.pathfinder.gov.bc.ca/',
                author: 'cvarjao',
                title: 'Red Hat Single Sign On (aka KeyCloak)',
                description:
                  'Red Hat Single Sign On is a modern, developer-friendly single sign on solution implementing the OpenID Connect specification as well as SAML.  The BC Gov implementation provides built-in intregration with IDIR, BCeID and GitHub and allow application developers to quickly meet the authentication needs of their applications. Red Hat SSO is the downstream, commercially supported distribution of the open source KeyCloak product.',
                image:
                  'https://github.com/keycloak/keycloak-misc/blob/master/logo/keycloak_icon_128px.png?raw=true',
              },
            },
            {
              sourceType: 'web',
              sourceProperties: {
                url: 'https://catalogue.data.gov.bc.ca/',
                title: 'BC Data Catalogue',
                description:
                  'The BC Data catalogue helps users to find, understand and explore data. The catalogue also provides contact information so that data users can contact Data Custodians for additional information if required.',
              },
            },
          ],
        },
      },
    ];
    // you will notice the url property is missing in source type github
    // url is not used and is be deprecated from future functions
    const sources = [
      {
        sourceType: 'web',
        id: 'id',
        sourceProperties: {
          url: 'https://sso.pathfinder.gov.bc.ca/',
          author: 'cvarjao',
          title: 'Red Hat Single Sign On (aka KeyCloak)',
          description:
            'Red Hat Single Sign On is a modern, developer-friendly single sign on solution implementing the OpenID Connect specification as well as SAML.  The BC Gov implementation provides built-in intregration with IDIR, BCeID and GitHub and allow application developers to quickly meet the authentication needs of their applications. Red Hat SSO is the downstream, commercially supported distribution of the open source KeyCloak product.',
          image: 'http://design.jboss.org/keycloak/logo/images/keycloak_logo_600px.svg',
        },
      },
      {
        sourceType: 'github',
        id: 'id',
        sourceProperties: {
          owner: 'bcdevops',
          repo: 'openshift-wiki',
          file: 'docs/RH-SSO/RequestSSORealm.md',
        },
      },
      {
        sourceType: 'github',
        id: 'id',
        sourceProperties: {
          owner: 'bcdevops',
          repo: 'openshift-wiki',
          file: 'docs/RH-SSO/ServiceDefinition.md',
        },
      },
      {
        sourceType: 'web',
        id: 'id',
        sourceProperties: {
          url:
            'https://sminfo.gov.bc.ca/docs/Provincial%20IDIM%20Program%20-%20Building%20SiteMinder%20Integrated%20Apps%202.0.4.pdf',
          title: 'Building SiteMinder Integrated Applications',
          description:
            'This document describes the methods that can be used to integrate web applications with the BC Governments SiteMinder infrastructure. \\n This document is intended for the architects, designers and developers producing web applications that integrate with the IDIM SiteMinder service.',
        },
      },
      {
        sourceType: 'web',
        id: 'id',
        sourceProperties: {
          resourceType: 'Self-Service Tools',
          title: 'OpenShift Developer Console',
          description:
            'This guide is intended for application developers, and provides instructions for setting up and configuring a workstation to develop and deploy applications in an OpenShift Container Platform.',
          url: 'https://console.pathfinder.gov.bc.ca:8443/console/projects',
        },
      },
      {
        sourceType: 'github',
        id: 'id',
        sourceProperties: {
          owner: 'BCDevOps',
          repo: 'openshift-wiki',
          file: 'docs/API/KongAPI.md',
        },
      },
      {
        sourceType: 'github',
        id: 'id',
        sourceProperties: {
          owner: 'bcgov',
          repo: 'devhub-resources',
          file: 'resources/tools/sizzy.md',
        },
      },
      {
        sourceType: 'web',
        id: 'id',
        sourceProperties: {
          url: 'https://signing-web-devhub-prod.pathfinder.gov.bc.ca',
        },
      },
      {
        sourceType: 'web',
        id: 'id',
        sourceProperties: {
          url: 'https://github.com/bcgov',
          author: 'kelpisland',
          title: 'BC Gov on GitHub',
          description:
            "BC Government's home on GitHub. Open source code developed by and for the BC Government resides here.",
          image: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png',
        },
      },
      {
        sourceType: 'web',
        id: 'id',
        sourceProperties: {
          url: 'https://sso.pathfinder.gov.bc.ca/',
          author: 'cvarjao',
          title: 'Red Hat Single Sign On (aka KeyCloak)',
          description:
            'Red Hat Single Sign On is a modern, developer-friendly single sign on solution implementing the OpenID Connect specification as well as SAML.  The BC Gov implementation provides built-in intregration with IDIR, BCeID and GitHub and allow application developers to quickly meet the authentication needs of their applications. Red Hat SSO is the downstream, commercially supported distribution of the open source KeyCloak product.',
          image:
            'https://github.com/keycloak/keycloak-misc/blob/master/logo/keycloak_icon_128px.png?raw=true',
        },
      },
      {
        sourceType: 'web',
        id: 'id',
        sourceProperties: {
          url: 'https://catalogue.data.gov.bc.ca/',
          title: 'BC Data Catalogue',
          description:
            'The BC Data catalogue helps users to find, understand and explore data. The catalogue also provides contact information so that data users can contact Data Custodians for additional information if required.',
        },
      },
    ];

    expect(extractSourcesFromRegistry(registry)).toEqual(sources);
  });
});
