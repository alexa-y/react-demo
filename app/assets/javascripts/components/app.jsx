var App = React.createClass({
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <ReactRouter.Link className="navbar-brand" to='/'>React</ReactRouter.Link>
            </div>
            <div className="collapse navbar-collapse">
              <ul className="nav navbar-nav navbar-right">
                <li><ReactRouter.Link to='/posts/new'>
                  <span className="fa fa-plus" /> New Post
                </ReactRouter.Link></li>
              </ul>
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
