var App = React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <ReactRouter.Link className="navbar-brand" to='/'>React</ReactRouter.Link>
            </div>
          </div>
        </nav>
        <div id="content">
          <ReactRouter.RouteHandler />
        </div>
      </div>
    );
  }
});
