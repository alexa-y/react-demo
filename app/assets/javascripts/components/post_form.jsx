var PostForm = React.createClass({
  mixins: [ ReactRouter.Navigation ],
  getInitialState: function() {
    return { title: '', body: '' };
  },
  handleSubmit: function(e) {
    e.preventDefault();
    url = '/api/v1/posts';
    if (this.props.postId) url += ('/' + this.props.postId);
    method = this.props.postId ? 'put' : 'post';
    $.ajax(url, {
      dataType: 'json',
      type: method,
      data: { post: { title: this.state.title, body: this.state.body } },
      success: function(data) {
        this.transitionTo('/');
      }.bind(this)
    });
  },
  handleChange: function(e) {
    if (e.target.id == 'post_title') this.setState({ title: e.target.value });
    if (e.target.id == 'post_body') this.setState({ body: e.target.value });
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-offset-3 col-md-6">
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label className="control-label">Title</label>
              <input className="form-control" id="post_title" onChange={this.handleChange} value={this.state.title} />
            </div>
            <div className="form-group">
              <label className="control-label">Body</label>
              <textarea rows="10" className="form-control" id="post_body" onChange={this.handleChange} value={this.state.body} />
            </div>
            <input type="submit" className="btn btn-primary"/>
          </form>
        </div>
      </div>
    );
  }
});
