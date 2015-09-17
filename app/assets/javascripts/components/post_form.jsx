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
        if (this.props.post) {
          this.props.post.setState({ editing: false, title: this.state.title, body: this.state.body });
        } else {
          debugger;
          this.transitionTo('/');
        }
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
          <form className="form" onSubmit={this.handleSubmit} data-fv-framework="bootstrap" data-fv-icon-valid="glyphicon glyphicon-ok" data-fv-icon-invalid="glyphicon glyphicon-remove" data-fv-icon-validating="glyphicon glyphicon-refresh fa-spin">
            <div className="form-group">
              <label className="control-label">Title</label>
              <input className="form-control" name="post[title]" id="post_title" onChange={this.handleChange} value={this.state.title} data-fv-notempty="true" data-fv-stringlength="true" data-fv-stringlength-min="5" data-fv-stringlength-max="255" />
            </div>
            <div className="form-group">
              <label className="control-label">Body</label>
              <textarea rows="10" className="form-control" name="post[body]" id="post_body" onChange={this.handleChange} value={this.state.body} data-fv-notempty="true" data-fv-stringlength="true" data-fv-stringlength-min="5" />
            </div>
            <input type="submit" className="btn btn-primary" disabled="disabled"/>
          </form>
        </div>
      </div>
    );
  },
  componentDidMount: function() {
    if (this.props.title || this.props.body) {
      this.setState({ title: this.props.title, body: this.props.body });
    }
    this.updateFormValidation();
  },
  componentDidUpdate: function() {
    this.updateFormValidation();
  },
  updateFormValidation: function() {
    $(this.getDOMNode()).find('form:first').formValidation().on('success.form.fv', function(e) {
      e.preventDefault();
    });
  }
});
