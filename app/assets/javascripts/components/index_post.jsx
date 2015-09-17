var IndexPost = React.createClass({
  getDefaultProps: function() {
    return { title: '', body: '' };
  },
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <ReactRouter.Link to={'/posts/' + this.props.postId}>
            <div className="panel-title">{this.props.title}</div>
          </ReactRouter.Link>
        </div>
        <div className="panel-body">
          {this.props.body}
        </div>
      </div>
    );
  }
});
