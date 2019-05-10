import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'dva/router';
import Report from './report/report';
import Main from './main/main';

interface Props {
    dispatch?: any,
    index?: any,
}

@connect(state => ({
    index: state.index
}))
class Index extends React.PureComponent<Props, any> {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        window.addEventListener('popstate', this.listenPopstate, false);
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.listenPopstate, false);
    }

    listenPopstate = () => {
        const {showReport} = this.props.index;

        if (showReport) {
            this.props.dispatch({
                type: 'index/changeShowReport',
                payload: false
            });
        }
    }

    render() {

        const {
            showReport,
            option
        } = this.props.index;

        return(
            <div>
                {showReport
                ?<Report option={option}></Report>
                :<Main></Main>}
            </div>
        )
    }
}

export default withRouter(Index);
