var Home = React.createClass({
  getInitialState: function() {
    return { posts: undefined };
  },
  componentDidMount: function() {
    $.getJSON('/api/v1/posts', function(data) {
      posts = $.map(data, function(obj) {
        return obj;
      });
      this.setState({ posts: posts });
    }.bind(this));
  },
  render: function() {
    var loadingIcon = this.state.posts == undefined ? <Spinner /> : '';
    var posts = this.state.posts || [];
    return (
      <div className="row">
        <div className="col-md-offset-1 col-md-10">
          {loadingIcon}
          {$.map(posts, function(post) {
            return <Post key={'post_' + post.id} postId={post.id} title={post.title} body={post.body} withComments={false} />;
          })}
        </div>
      </div>
    );
  }
});
