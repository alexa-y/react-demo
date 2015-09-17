var Comment = React.createClass({
  render: function() {
    return (
      <div className="well well-sm">
        <div className="row">
          <div className="col-md-11">
            {this.props.body}
          </div>
          <div className="col-md-1">
            <div className="pull-right btn-group">
              <a className="dropdown-toggle" data-toggle="dropdown">
                <i className="fa fa-cog" />
              </a>
              <ul className="dropdown-menu">
                <li><a onClick={this.delete}><i className="fa fa-trash" /> Delete</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  },
  delete: function() {
    $.ajax('/api/v1/posts/' + this.props.postId + '/comments/' + this.props.commentId, {
      type: 'delete',
      success: function() {
        this.props.post.removeComment(this.props.index);
      }.bind(this)
    });
  }
})
