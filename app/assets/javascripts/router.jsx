var routes = (
  <ReactRouter.Route path='/' handler={App}>
    <ReactRouter.DefaultRoute handler={Home}/>
    <ReactRouter.Route path='/posts/new' handler={PostForm}/>
  </ReactRouter.Route>
);

$(document).ready(function() {
  ReactRouter.run(routes, function(Handler) {
    React.render(<Handler />, document.getElementById('container'));
  });
});
