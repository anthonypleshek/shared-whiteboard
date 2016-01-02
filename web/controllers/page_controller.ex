defmodule Whiteboard.PageController do
  use Whiteboard.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
