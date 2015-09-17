var Post = React.createClass({
  mixins: [ReactRouter.Navigation],
  getInitialState: function() {
    return { comments: undefined, title: '', body: '', editing: false, commentBody: '' };
  },
  componentDidMount: function() {
    $.getJSON('/api/v1/posts/' + this.props.params.postId + '?include[]=comments', function(data) {
      this.setState({
        title: data.title,
        body: data.body,
        comments: data.comments
      });
    }.bind(this));
  },
  componentDidUpdate: function() {
    this.updateFormValidation();
  },
  render: function() {
    if (this.state.editing) {
      var content = <PostForm post={this} title={this.state.title} body={this.state.body} postId={this.props.params.postId}/>;
    } else if (this.state.comments) {
      var content = (
        <div>
          <div className="panel panel-default">
            <div className="panel-heading">
              {this.state.title}
              <div className="pull-right btn-group">
                <a className="dropdown-toggle" data-toggle="dropdown">
                  <i className="fa fa-cog" />
                </a>
                <ul className="dropdown-menu">
                  <li><a onClick={this.edit}><i className="fa fa-pencil" /> Edit</a></li>
                  <li><a onClick={this.delete}><i className="fa fa-trash" /> Delete</a></li>
                </ul>
              </div>
            </div>
            <div className="panel-body">
              {this.state.body}
            </div>
          </div>
          {$.map(this.state.comments, function(comment, index) {
            return (
              <Comment key={"comment_" + comment.id} post={this} body={comment.body} index={index} postId={this.props.params.postId} commentId={comment.id}/>
            );
          }.bind(this))}
          <form className="form" onSubmit={this.handleSubmit} data-fv-framework="bootstrap" data-fv-icon-valid="glyphicon glyphicon-ok" data-fv-icon-invalid="glyphicon glyphicon-remove" data-fv-icon-validating="glyphicon glyphicon-refresh fa-spin">
            <div className="form-group">
              <label className="control-label">New Comment</label>
              <textarea rows="4" className="form-control" name="comment[body]" id="comment_body" onChange={this.handleChange} value={this.state.commentBody} data-fv-notempty="true" data-fv-stringlength="true" data-fv-stringlength-min="5" />
            </div>
            <input type="submit" className="btn btn-primary" disabled="disabled" />
          </form>
        </div>
      );
    } else {
      var content = (
        <Spinner />
      );
    }
    return (
      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          {content}
        </div>
      </div>
    );
  },
  handleChange: function(e) {
    this.setState({ commentBody: e.target.value });
  },
  edit: function() {
    this.setState({ editing: true });
  },
  delete: function() {
    $.ajax('/api/v1/posts/' + this.props.params.postId, {
      type: 'delete',
      success: function() {
        this.transitionTo('/');
      }.bind(this)
    });
  },
  updateFormValidation: function() {
    $(this.getDOMNode()).find('form:first').formValidation().on('success.form.fv', function(e) {
      e.preventDefault();
    });
  },
  handleSubmit: function() {
    $.ajax('/api/v1/posts/' + this.props.params.postId + '/comments', {
      dataType: 'json',
      type: 'post',
      data: { comment: { body: this.state.commentBody } },
      success: function(data) {
        this.setState({ comments: this.state.comments.concat(data), commentBody: '' });
        $(this.getDOMNode()).find('form:first').data('formValidation').resetForm();
      }.bind(this)
    });
  },
  removeComment: function(index) {
    this.state.comments.splice(index, 1);
    this.setState({ comments: this.state.comments });
  }
});
