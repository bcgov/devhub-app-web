import React from "react"

export default function (WrappedComponent, node) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                node: node
            }
        }

        render() {
            return <WrappedComponent {...this.props} node={this.state.node}/>;
        }
    }
}