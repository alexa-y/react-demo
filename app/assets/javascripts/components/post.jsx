var Post = React.createClass({
  getDefaultProps: function() {
    return { title: '', body: '', withComments: false };
  },
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <div className="panel-title">{this.props.title}</div>
        </div>
        <div className="panel-body">
          {this.props.body}
        </div>
      </div>
    );
  }
});
