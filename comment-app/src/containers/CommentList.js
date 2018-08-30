import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import CommentList from '../components/CommentList'
import {initComments, deleteComment, praiseComment} from '../reducers/comments'

class CommentListContainer extends Component {
    /*  static propTypes = {
        comments: PropTypes.array,
        initComments: PropTypes.func,
        onDeleteComment: PropTypes.func
      }
      */

    componentWillMount() {
        this._loadComments()
    }

    _loadComments() {
        let comments = localStorage.getItem('comments')
        comments = comments ? JSON.parse(comments) : []
        // this.props.initComments 是 connect 传进来的
        // 可以帮我们把数据初始化到 state 里面去
        this.props.initComments(comments)
    }

    handleDeleteComment(index) {
        const {comments} = this.props
        const newComments = [
            ...comments.slice(0, index),
            ...comments.slice(index + 1)
        ]

        // this.props.onDeleteComment 是 connect 传进来的
        // 会 dispatch 一个 action 去删除评论
        localStorage.setItem('comments', JSON.stringify(newComments))
        if (this.props.onDeleteComment) {
            this.props.onDeleteComment(index)
        }
    }

    handlePraiseComment(index) {

        if(this.props.onPraiseComment){
            this.props.onPraiseComment(index)
        }

        localStorage.setItem('comments', JSON.stringify(this.props.comments))
    }

    render() {
        return (
            <CommentList
                comments={this.props.comments}
                onDeleteComment={this.handleDeleteComment.bind(this)}
                onPraiseComment={this.handlePraiseComment.bind(this)}/>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        comments: state.comments
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initComments: (comments) => {
            dispatch(initComments(comments))
        },
        onDeleteComment: (commentIndex) => {
            dispatch(deleteComment(commentIndex))
        },
        onPraiseComment: (commentIndex) => {
            dispatch(praiseComment(commentIndex))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentListContainer)
