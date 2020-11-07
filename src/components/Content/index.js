import React from 'react'
// import { debounce } from '../../utills/debounce';
import LeftContent from './LeftContent';
import RightContent from './RightContent';
import './style.css'

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPreviewOpen: false,
            previewId: undefined
        }
    }
    openPreview = (id) => {
        this.setState({
            isPreviewOpen: true,
            previewId: id
        })
    }

    closePreview = (id) => {
        this.setState((prevState) => {
            const { previewId } = prevState
            return (previewId === id) ? { previewId: undefined, isPreviewOpen: false } : { previewId }
        })
    }

    render() {
        const {
            isPreviewOpen,
            previewId
        } = this.state
        return (
            <div className='content'>
                <LeftContent
                    openPreview={this.openPreview}
                    closePreview={this.closePreview}
                />
                {isPreviewOpen && <RightContent
                    tasklistId={previewId}
                />}
            </div>
        );
    }
}


export default Content;