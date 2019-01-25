import React from "react"
import Octokit from "@octokit/rest"

export default class ComponentPreview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            sampleContent: ''
        };
    }

    async componentDidMount() {
        const githubClient = new Octokit();

        try {
            const result = await githubClient.repos.getContents({"owner": "bcgov", "repo":"design-system", "path": "components/primary_button/sample.html", "ref": "feature/57-interactive-code-examples" });

            this.setState({
                isLoaded: true,
                sampleContent: result.data.content
            });
        } catch (error) {
            console.error("Error: " + error);
            this.setState({
                isLoaded: true,
                error
            });
        }
    }

    render() {
            const { error, isLoaded, sampleContent } = this.state;

            if (error) {
                return <div>Error {error.message}</div>
            } else if (!isLoaded) {
                return <div>Loading...</div>
            } else {
                return (
                    <iframe src={'data:text/html;base64,' + sampleContent} frameBorder={'0'} />
                );
            }
    }
}